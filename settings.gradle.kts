pluginManagement {
    val kotlinVersion: String by settings
    val shadowJarVersion: String by settings

    repositories {
        mavenCentral()
        gradlePluginPortal()
    }

    plugins {
        kotlin("jvm") version kotlinVersion
        id("com.github.johnrengelman.shadow") version shadowJarVersion
    }
}

plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.5.0"
}

rootProject.name = "ktlibs"

include("kotlin-stdlib")
include("kotlin-reflect")
include("kotlinx-coroutines-core")
include("kotlinx-serialization")
include("kotlinx-datetime")
include("kotlinx-atomicfu")
include("kotlinx-io")
include("kotlinx-collections-immutable")
