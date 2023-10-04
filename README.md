# Ktlibs

Spigot plugin for kotlin related libraries

Check for updates regularly every day

[![Check versions](https://github.com/2A5F/kotlin-libs-mcplg/actions/workflows/check.yml/badge.svg)](https://github.com/2A5F/kotlin-libs-mcplg/actions/workflows/check.yml)
[![Build](https://github.com/2A5F/kotlin-libs-mcplg/actions/workflows/build.yml/badge.svg)](https://github.com/2A5F/kotlin-libs-mcplg/actions/workflows/build.yml)

# For players

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
