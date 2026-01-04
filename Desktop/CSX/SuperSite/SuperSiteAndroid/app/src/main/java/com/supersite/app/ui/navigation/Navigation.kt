package com.supersite.app.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.supersite.app.data.model.User
import com.supersite.app.ui.screens.AuthScreen
import com.supersite.app.ui.screens.HomeScreen

object Routes {
    const val HOME = "home"
    const val AUTH = "auth"
    const val PROFILE = "profile"
    const val SUBJECT = "subject/{subjectId}"
    const val LEADERBOARD = "leaderboard"
    
    fun subject(id: String) = "subject/$id"
}

@Composable
fun SuperSiteNavGraph(
    navController: NavHostController,
    isLoggedIn: Boolean,
    currentUser: User?
) {
    NavHost(
        navController = navController,
        startDestination = Routes.HOME
    ) {
        composable(Routes.HOME) {
            HomeScreen(
                navController = navController,
                isLoggedIn = isLoggedIn,
                currentUser = currentUser
            )
        }
        
        composable(Routes.AUTH) {
            AuthScreen(
                navController = navController,
                onLoginSuccess = { 
                    navController.popBackStack()
                }
            )
        }
    }
}
