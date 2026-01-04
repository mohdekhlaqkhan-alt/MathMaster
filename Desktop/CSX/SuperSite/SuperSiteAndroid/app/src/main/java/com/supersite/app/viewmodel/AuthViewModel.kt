package com.supersite.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.supersite.app.data.model.User
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import javax.inject.Inject

data class AuthState(
    val isLoading: Boolean = false,
    val isLoggedIn: Boolean = false,
    val user: User? = null,
    val error: String? = null
)

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val auth: FirebaseAuth,
    private val firestore: FirebaseFirestore
) : ViewModel() {

    private val _authState = MutableStateFlow(AuthState())
    val authState: StateFlow<AuthState> = _authState.asStateFlow()

    init {
        checkCurrentUser()
    }

    private fun checkCurrentUser() {
        auth.currentUser?.let { firebaseUser ->
            viewModelScope.launch {
                _authState.value = _authState.value.copy(isLoading = true)
                try {
                    val doc = firestore.collection("users").document(firebaseUser.uid).get().await()
                    val user = doc.toObject(User::class.java)?.copy(uid = firebaseUser.uid)
                        ?: User(
                            uid = firebaseUser.uid,
                            name = firebaseUser.displayName ?: "Student",
                            email = firebaseUser.email ?: ""
                        )
                    _authState.value = AuthState(isLoggedIn = true, user = user)
                } catch (e: Exception) {
                    _authState.value = AuthState(isLoggedIn = true, user = User(uid = firebaseUser.uid))
                }
            }
        } ?: run {
            _authState.value = AuthState(isLoggedIn = false)
        }
    }

    fun signInWithEmail(email: String, password: String) {
        viewModelScope.launch {
            _authState.value = _authState.value.copy(isLoading = true, error = null)
            try {
                val result = auth.signInWithEmailAndPassword(email, password).await()
                result.user?.let { user ->
                    loadUserProfile(user.uid)
                }
            } catch (e: Exception) {
                _authState.value = _authState.value.copy(
                    isLoading = false,
                    error = e.message ?: "Login failed"
                )
            }
        }
    }

    fun signUpWithEmail(name: String, email: String, password: String) {
        viewModelScope.launch {
            _authState.value = _authState.value.copy(isLoading = true, error = null)
            try {
                val result = auth.createUserWithEmailAndPassword(email, password).await()
                result.user?.let { firebaseUser ->
                    val newUser = User(
                        uid = firebaseUser.uid,
                        name = name,
                        email = email
                    )
                    firestore.collection("users").document(firebaseUser.uid).set(newUser).await()
                    _authState.value = AuthState(isLoggedIn = true, user = newUser)
                }
            } catch (e: Exception) {
                _authState.value = _authState.value.copy(
                    isLoading = false,
                    error = e.message ?: "Sign up failed"
                )
            }
        }
    }

    private suspend fun loadUserProfile(uid: String) {
        try {
            val doc = firestore.collection("users").document(uid).get().await()
            val user = doc.toObject(User::class.java)?.copy(uid = uid) ?: User(uid = uid)
            _authState.value = AuthState(isLoggedIn = true, user = user)
        } catch (e: Exception) {
            _authState.value = AuthState(isLoggedIn = true, user = User(uid = uid))
        }
    }

    fun signOut() {
        auth.signOut()
        _authState.value = AuthState(isLoggedIn = false)
    }

    fun clearError() {
        _authState.value = _authState.value.copy(error = null)
    }
}
