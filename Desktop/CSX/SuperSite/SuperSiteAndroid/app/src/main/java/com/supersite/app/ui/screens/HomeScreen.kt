package com.supersite.app.ui.screens

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.supersite.app.data.model.User
import com.supersite.app.ui.navigation.Routes
import com.supersite.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    navController: NavController,
    isLoggedIn: Boolean,
    currentUser: User?
) {
    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text("🚀", fontSize = 28.sp)
                        Spacer(Modifier.width(8.dp))
                        Text(
                            "SuperSite",
                            fontWeight = FontWeight.Bold,
                            fontSize = 22.sp
                        )
                    }
                },
                actions = {
                    if (isLoggedIn && currentUser != null) {
                        Box(
                            modifier = Modifier
                                .padding(end = 16.dp)
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(
                                    Brush.linearGradient(
                                        listOf(PrimaryBlue, PrimaryPurple)
                                    )
                                )
                                .clickable { /* Profile */ },
                            contentAlignment = Alignment.Center
                        ) {
                            Text(currentUser.avatar, fontSize = 24.sp)
                        }
                    } else {
                        TextButton(onClick = { navController.navigate(Routes.AUTH) }) {
                            Text("Login", color = PrimaryBlue, fontWeight = FontWeight.SemiBold)
                        }
                    }
                },
                colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(Modifier.height(24.dp))
            
            // Hero Section
            HeroSection(
                isLoggedIn = isLoggedIn,
                userName = currentUser?.name
            )
            
            Spacer(Modifier.height(32.dp))
            
            // Player Stats (if logged in)
            if (isLoggedIn && currentUser != null) {
                PlayerStatsBar(user = currentUser)
                Spacer(Modifier.height(24.dp))
            }
            
            // Subjects Section
            Text(
                "📚 Choose Your Subject",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.fillMaxWidth()
            )
            
            Spacer(Modifier.height(16.dp))
            
            SubjectCard(
                icon = "📐",
                name = "Mathematics",
                description = "Squares, Cubes, Tables, Formulas",
                gradientColors = listOf(MathGradientStart, MathGradientEnd),
                onClick = { /* Navigate to Math */ }
            )
            
            Spacer(Modifier.height(12.dp))
            
            SubjectCard(
                icon = "🔬",
                name = "Science",
                description = "Coming Soon",
                gradientColors = listOf(ScienceGradientStart, ScienceGradientEnd),
                onClick = { }
            )
            
            Spacer(Modifier.height(12.dp))
            
            SubjectCard(
                icon = "🌍",
                name = "General Knowledge",
                description = "Coming Soon",
                gradientColors = listOf(GKGradientStart, GKGradientEnd),
                onClick = { }
            )
            
            Spacer(Modifier.height(32.dp))
            
            // Footer
            Text(
                "Made with ❤️ by Noorjahan Public School",
                fontSize = 14.sp,
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f)
            )
            
            Spacer(Modifier.height(24.dp))
        }
    }
}

@Composable
private fun HeroSection(isLoggedIn: Boolean, userName: String?) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = if (isLoggedIn) "Welcome back, ${userName ?: "Student"}!" 
                   else "Learn Anything,\nMaster Everything",
            fontSize = 28.sp,
            fontWeight = FontWeight.ExtraBold,
            textAlign = TextAlign.Center,
            lineHeight = 36.sp
        )
        
        Spacer(Modifier.height(12.dp))
        
        Text(
            text = "An interactive learning platform for curious minds",
            fontSize = 16.sp,
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.7f),
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun PlayerStatsBar(user: User) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            StatItem(icon = "⭐", value = "${user.xp}", label = "XP")
            StatItem(icon = "🎯", value = "Lv.${user.level}", label = "Level")
            StatItem(icon = "🔥", value = "${user.streak}", label = "Streak")
            StatItem(icon = "🏆", value = user.getRank(), label = "Rank")
        }
    }
}

@Composable
private fun StatItem(icon: String, value: String, label: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(icon, fontSize = 24.sp)
        Text(value, fontWeight = FontWeight.Bold, fontSize = 16.sp)
        Text(
            label,
            fontSize = 12.sp,
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.6f)
        )
    }
}

@Composable
private fun SubjectCard(
    icon: String,
    name: String,
    description: String,
    gradientColors: List<Color>,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(100.dp)
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(16.dp)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Brush.horizontalGradient(gradientColors))
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxSize(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(56.dp)
                        .background(Color.White.copy(alpha = 0.2f), RoundedCornerShape(12.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text(icon, fontSize = 32.sp)
                }
                
                Spacer(Modifier.width(16.dp))
                
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        name,
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp
                    )
                    Text(
                        description,
                        color = Color.White.copy(alpha = 0.8f),
                        fontSize = 14.sp
                    )
                }
                
                Text("→", color = Color.White, fontSize = 24.sp)
            }
        }
    }
}
