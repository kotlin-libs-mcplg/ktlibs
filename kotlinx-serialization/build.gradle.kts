import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinxSerializationVersion: String by properties

version = kotlinxSerializationVersion

dependencies {
    api("org.jetbrains.kotlinx:kotlinx-serialization-core:$kotlinxSerializationVersion")
    api("org.jetbrains.kotlinx:kotlinx-serialization-json:$kotlinxSerializationVersion")
    api("org.jetbrains.kotlinx:kotlinx-serialization-cbor:$kotlinxSerializationVersion")
    api("org.jetbrains.kotlinx:kotlinx-serialization-protobuf:$kotlinxSerializationVersion")
    api("org.jetbrains.kotlinx:kotlinx-serialization-properties:$kotlinxSerializationVersion")
}

tasks {
    named<ShadowJar>("shadowJar") {
        dependencies {
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-core"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-core-jvm"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-json"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-json-jvm"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-cbor"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-cbor-jvm"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-protobuf"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-protobuf-jvm"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-properties"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-properties-jvm"))
        }
    }
}
