val kotlinVersion: String by properties

version = "$kotlinVersion-test.0"

dependencies {
    api(kotlin("stdlib", kotlinVersion))
}
