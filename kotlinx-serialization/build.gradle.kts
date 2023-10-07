import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinVersion: String by properties
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
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-core:$kotlinxSerializationVersion"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-core-jvm:$kotlinxSerializationVersion"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-json:$kotlinxSerializationVersion"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-json-jvm:$kotlinxSerializationVersion"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-cbor:$kotlinxSerializationVersion"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-cbor-jvm:$kotlinxSerializationVersion"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-protobuf:$kotlinxSerializationVersion"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-protobuf-jvm:$kotlinxSerializationVersion"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-properties:$kotlinxSerializationVersion"))
            include(dependency("org.jetbrains.kotlinx:kotlinx-serialization-properties-jvm:$kotlinxSerializationVersion"))
        }
    }
}
