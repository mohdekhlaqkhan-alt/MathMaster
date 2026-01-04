package com.supersite.app.data.model

/**
 * User profile data class
 */
data class User(
    val uid: String = "",
    val name: String = "",
    val email: String = "",
    val avatar: String = "🐼",
    val level: Int = 1,
    val xp: Long = 0,
    val streak: Int = 0,
    val correctAnswers: Int = 0,
    val wrongAnswers: Int = 0,
    val isPremium: Boolean = false
) {
    fun getRank(): String = when {
        level >= 50 -> "Legend"
        level >= 30 -> "Master"
        level >= 20 -> "Diamond"
        level >= 10 -> "Gold"
        level >= 5 -> "Silver"
        else -> "Bronze"
    }

    fun getXPForNextLevel(): Long = (level * 100).toLong()
    
    fun getWalletBalance(): Double = (xp * 0.01)
}
