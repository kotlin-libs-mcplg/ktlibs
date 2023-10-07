import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinxAtomicfuVersion: String by properties

version = kotlinxAtomicfuVersion

dependencies {
    api("org.jetbrains.kotlinx:atomicfu:$kotlinxAtomicfuVersion")
}

tasks {
    named<ShadowJar>("shadowJar") {
        dependencies {
            include(dependency("org.jetbrains.kotlinx:atomicfu"))
            include(dependency("org.jetbrains.kotlinx:atomicfu-jvm"))
        }
    }
}
