import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinxCollectionsImmutableVersion: String by properties

version = kotlinxCollectionsImmutableVersion

dependencies {
    api("org.jetbrains.kotlinx:kotlinx-collections-immutable:$kotlinxCollectionsImmutableVersion")
}

tasks {
    named<ShadowJar>("shadowJar") {
        dependencies {
            include(dependency("org.jetbrains.kotlinx:kotlinx-collections-immutable"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-collections-immutable-jvm"))
        }
    }
}
