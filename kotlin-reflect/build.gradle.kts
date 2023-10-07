import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinReflectVersion: String by properties

version = kotlinReflectVersion

dependencies {
    api("org.jetbrains.kotlin:kotlin-reflect:$kotlinReflectVersion")
}

tasks {
    named<ShadowJar>("shadowJar") {
        dependencies {
            include(dependency("org.jetbrains.kotlin:kotlin-reflect"))
        }
    }
}
