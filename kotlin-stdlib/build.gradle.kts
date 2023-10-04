val kotlinVersion: String by properties

version = kotlinVersion

dependencies {
    api(kotlin("stdlib", kotlinVersion))
}
