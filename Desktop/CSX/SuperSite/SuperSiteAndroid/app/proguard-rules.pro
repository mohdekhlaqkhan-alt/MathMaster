# ProGuard rules
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable

# Firebase
-keepattributes Signature
-keepclassmembers class com.supersite.app.data.model.** { *; }

# Kotlin
-keep class kotlin.** { *; }
-keep class kotlinx.** { *; }
