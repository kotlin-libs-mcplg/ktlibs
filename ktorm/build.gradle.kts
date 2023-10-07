import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

val ktormVersion: String by properties

version = ktormVersion

dependencies {
    api("org.ktorm:ktorm-core:$ktormVersion")
    api("org.ktorm:ktorm-support-sqlite:$ktormVersion")
    api("org.ktorm:ktorm-support-postgresql:$ktormVersion")
    api("org.ktorm:ktorm-support-mysql:$ktormVersion")
    api("org.ktorm:ktorm-support-sqlserver:$ktormVersion")
    api("org.ktorm:ktorm-support-oracle:$ktormVersion")
    api("org.ktorm:ktorm-global:$ktormVersion")
}

tasks {
    named<ShadowJar>("shadowJar") {
        dependencies {
            include(dependency("org.ktorm:ktorm-core"))
            include(dependency("org.ktorm:ktorm-support-sqlite"))
            include(dependency("org.ktorm:ktorm-support-postgresql"))
            include(dependency("org.ktorm:ktorm-support-mysql"))
            include(dependency("org.ktorm:ktorm-support-sqlserver"))
            include(dependency("org.ktorm:ktorm-support-oracle"))
            include(dependency("org.ktorm:ktorm-global"))
        }
    }
}
