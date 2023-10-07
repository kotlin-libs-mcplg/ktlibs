import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val kotlinVersion: String by properties
val spigotVersion: String by properties
val bungeeCordVersion: String by properties
val velocityVersion: String by properties

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
        maven("https://hub.spigotmc.org/nexus/content/repositories/public/")
        maven("https://oss.sonatype.org/content/groups/public/")
        maven("https://repo.papermc.io/repository/maven-public/")
    }

    dependencies {
        compileOnly("org.spigotmc:spigot-api:$spigotVersion")
        compileOnly("net.md-5:bungeecord-api:$bungeeCordVersion")
        compileOnly("com.velocitypowered:velocity-api:$velocityVersion")
    }

    kotlin {
        jvmToolchain(8)
    }

    tasks {
        val theArchiveBaseName = "ktlibs-${project.name}"

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
            expand(mapOf("name" to project.name, "version" to project.version))
        }
    }
}
