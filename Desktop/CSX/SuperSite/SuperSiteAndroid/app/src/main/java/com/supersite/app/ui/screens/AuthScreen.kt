package com.supersite.app.ui.screens

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.supersite.app.ui.theme.*
import com.supersite.app.viewmodel.AuthViewModel

@Composable
fun AuthScreen(
    navController: NavController,
    onLoginSuccess: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    var isLoginMode by remember { mutableStateOf(true) }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var name by remember { mutableStateOf("") }
    var showPassword by remember { mutableStateOf(false) }
    
    val authState by viewModel.authState.collectAsState()

    LaunchedEffect(authState.isLoggedIn) {
        if (authState.isLoggedIn) onLoginSuccess()
    }

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(Modifier.height(60.dp))

            // Icon
            Text(
                text = if (isLoginMode) "👋" else "🎉",
                fontSize = 72.sp
            )

            Spacer(Modifier.height(16.dp))

            // Title
            Text(
                text = if (isLoginMode) "Welcome Back!" else "Create Account",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold
            )

            Text(
                text = if (isLoginMode) "Sign in to continue learning" 
                       else "Join the SuperSite community",
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.6f)
            )

            Spacer(Modifier.height(40.dp))

            // Name field (signup only)
            if (!isLoginMode) {
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Full Name") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    singleLine = true
                )
                Spacer(Modifier.height(16.dp))
            }

            // Email field
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                label = { Text("Email") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                singleLine = true
            )

            Spacer(Modifier.height(16.dp))

            // Password field
            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text("Password") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                singleLine = true,
                visualTransformation = if (showPassword) VisualTransformation.None 
                                       else PasswordVisualTransformation(),
                trailingIcon = {
                    IconButton(onClick = { showPassword = !showPassword }) {
                        Icon(
                            imageVector = if (showPassword) Icons.Default.Visibility 
                                         else Icons.Default.VisibilityOff,
                            contentDescription = null
                        )
                    }
                }
            )

            // Error message
            authState.error?.let { error ->
                Spacer(Modifier.height(16.dp))
                Text(
                    text = error,
                    color = Error,
                    fontSize = 14.sp
                )
            }

            Spacer(Modifier.height(24.dp))

            // Submit button
            Button(
                onClick = {
                    if (isLoginMode) {
                        viewModel.signInWithEmail(email, password)
                    } else {
                        viewModel.signUpWithEmail(name, email, password)
                    }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp),
                enabled = !authState.isLoading && email.isNotBlank() && password.isNotBlank(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            Brush.horizontalGradient(listOf(PrimaryBlue, PrimaryPurple)),
                            RoundedCornerShape(12.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    if (authState.isLoading) {
                        CircularProgressIndicator(
                            color = Color.White,
                            modifier = Modifier.size(24.dp),
                            strokeWidth = 2.dp
                        )
                    } else {
                        Text(
                            text = if (isLoginMode) "Sign In" else "Create Account",
                            color = Color.White,
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 16.sp
                        )
                    }
                }
            }

            Spacer(Modifier.height(16.dp))

            // Toggle login/signup
            TextButton(onClick = { isLoginMode = !isLoginMode }) {
                Text(
                    text = if (isLoginMode) "Don't have an account? Sign up"
                           else "Already have an account? Sign in",
                    color = PrimaryBlue
                )
            }

            Spacer(Modifier.height(8.dp))

            // Back button
            TextButton(onClick = { navController.popBackStack() }) {
                Text("← Back to Home")
            }
        }

        // Loading overlay
        if (authState.isLoading) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color.Black.copy(alpha = 0.3f)),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator(color = PrimaryBlue)
            }
        }
    }
}
