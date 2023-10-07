import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinxDatetimeVersion: String by properties

version = kotlinxDatetimeVersion

dependencies {
    api("org.jetbrains.kotlinx:kotlinx-datetime:$kotlinxDatetimeVersion")
    api("org.jetbrains.kotlinx:kotlinx-datetime-jvm:$kotlinxDatetimeVersion")
}

tasks {
    named<ShadowJar>("shadowJar") {
        dependencies {
            include(dependency("org.jetbrains.kotlinx:kotlinx-datetime"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-datetime-jvm"))
        }
    }
}
