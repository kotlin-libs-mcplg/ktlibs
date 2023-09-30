import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinVersion: String by properties
val spigotVersion: String by properties
val bungeeCordVersion: String by properties

plugins {
    kotlin("jvm")
    id("com.github.johnrengelman.shadow")
}

allprojects {
    group = "io.coplt.mcplg.ktlibs"

    apply(plugin = "org.jetbrains.kotlin.jvm")
    apply(plugin = "com.github.johnrengelman.shadow")

    repositories {
        mavenCentral()
        maven("https://hub.spigotmc.org/nexus/content/repositories/snapshots/")
        maven("https://oss.sonatype.org/content/groups/public/")
    }

    dependencies {
        compileOnly("org.spigotmc:spigot-api:$spigotVersion")
        compileOnly("net.md-5:bungeecord-api:$bungeeCordVersion")
    }

    kotlin {
        jvmToolchain(8)
    }

    tasks {
        val theArchiveBaseName = "ktlibs.${project.name}"

        jar {
            archiveBaseName = theArchiveBaseName
        }

        named<ShadowJar>("shadowJar") {
            archiveClassifier = ""
            archiveBaseName = theArchiveBaseName
        }

        build {
            dependsOn(shadowJar)
        }

        processResources {
            outputs.upToDateWhen { false }
            filesMatching("plugin.yml") {
                expand(mapOf("name" to project.name, "version" to project.version))
            }
        }
    }
}
