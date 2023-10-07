import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinxCoroutinesVersion: String by properties

version = kotlinxCoroutinesVersion

dependencies {
    api("org.jetbrains.kotlinx:kotlinx-coroutines-core:$kotlinxCoroutinesVersion")
}

tasks {
    named<ShadowJar>("shadowJar") {
        dependencies {
            include(dependency("org.jetbrains.kotlinx:kotlinx-coroutines-core"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-coroutines-core-jvm"))
        }
    }
}
