# Ktlibs

Spigot / BungeeCord / Velocity plugin for kotlin related libraries

Auto sync versions every day (UTC)

[![Check versions](https://github.com/kotlin-libs-mcplg/ktlibs/actions/workflows/check.yml/badge.svg)](https://github.com/kotlin-libs-mcplg/ktlibs/actions/workflows/check.yml)
[![Build](https://github.com/kotlin-libs-mcplg/ktlibs/actions/workflows/build.yml/badge.svg)](https://github.com/kotlin-libs-mcplg/ktlibs/actions/workflows/build.yml)

# Projects

- ### kotlin-stdlib  
  [![](https://img.shields.io/badge/-Ktlibs_Kotlin_Stdlib-16181c?logo=modrinth&logoColor=46d66d&labelColor=16181c)](https://modrinth.com/plugin/ktlibs-kotlin-stdlib)
  ![](https://img.shields.io/modrinth/v/ktlibs-kotlin-stdlib)

  included

  - [kotlin-stdlib](https://central.sonatype.com/artifact/org.jetbrains.kotlin/kotlin-stdlib)
  - [kotlin-stdlib-jdk8](https://central.sonatype.com/artifact/org.jetbrains.kotlin/kotlin-stdlib-jdk8)
  - [annotations](https://central.sonatype.com/artifact/org.jetbrains/annotations)

- ### kotlinx-coroutines-core  
  [![](https://img.shields.io/badge/-Ktlibs_Kotlinx_Coroutines_Core-16181c?logo=modrinth&logoColor=46d66d&labelColor=16181c)](https://modrinth.com/plugin/ktlibs-kotlinx-coroutines-core)
  ![](https://img.shields.io/modrinth/v/ktlibs-kotlinx-coroutines-core)

  included

  - [kotlinx-coroutines-core](https://central.sonatype.com/artifact/org.jetbrains.kotlinx/kotlinx-coroutines-core)
  - [kotlinx-coroutines-jdk8](https://central.sonatype.com/artifact/org.jetbrains.kotlinx/kotlinx-coroutines-jdk8)

- ### kotlinx-datetime  
  [![](https://img.shields.io/badge/-Ktlibs_Kotlinx_DateTime-16181c?logo=modrinth&logoColor=46d66d&labelColor=16181c)](https://modrinth.com/plugin/ktlibs-kotlinx-datetime)
  ![](https://img.shields.io/modrinth/v/ktlibs-kotlinx-datetime)

  included

  - [kotlinx-datetime](https://central.sonatype.com/artifact/org.jetbrains.kotlinx/kotlinx-datetime)

- ### kotlinx-serialization  
  [![](https://img.shields.io/badge/-Ktlibs_Kotlinx_Serialization-16181c?logo=modrinth&logoColor=46d66d&labelColor=16181c)](https://modrinth.com/plugin/ktlibs-kotlinx-serialization)
  ![](https://img.shields.io/modrinth/v/ktlibs-kotlinx-serialization)

  included

  - [kotlinx-serialization-core](https://central.sonatype.com/artifact/org.jetbrains.kotlinx/kotlinx-serialization-core)
  - [kotlinx-serialization-json](https://central.sonatype.com/artifact/org.jetbrains.kotlinx/kotlinx-serialization-json)
  - [kotlinx-serialization-cbor](https://central.sonatype.com/artifact/org.jetbrains.kotlinx/kotlinx-serialization-cbor)
  - [kotlinx-serialization-protobuf](https://central.sonatype.com/artifact/org.jetbrains.kotlinx/kotlinx-serialization-protobuf)
  - [kotlinx-serialization-properties](https://central.sonatype.com/artifact/org.jetbrains.kotlinx/kotlinx-serialization-properties)

# For players / server manager / users

You only need to download this plugin if other plugins depend on it

# For developers

Example by `kotlin-stdlib`

```kts
// build.gradle.kts

val kotlin_version = "the version"

repositories {
    maven("https://api.modrinth.com/maven")
}

dependencies {
    implementation("maven.modrinth:ktlibs-kotlin-stdlib:$kotlin_version")
}

```
