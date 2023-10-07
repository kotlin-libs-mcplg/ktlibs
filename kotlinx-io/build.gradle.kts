import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinxIoVersion: String by properties

version = kotlinxIoVersion

dependencies {
    api("org.jetbrains.kotlinx:kotlinx-io-core:$kotlinxIoVersion")
    api("org.jetbrains.kotlinx:kotlinx-io-core-jvm:$kotlinxIoVersion")
}

tasks {
    named<ShadowJar>("shadowJar") {
        dependencies {
            include(dependency("org.jetbrains.kotlinx:kotlinx-io-core"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-io-core-jvm"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-io-bytestring"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-io-bytestring-jvm"))
        }
    }
}
