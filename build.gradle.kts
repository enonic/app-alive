plugins {
    id("com.enonic.defaults") version "2.1.6"
    id("com.enonic.xp.app")
    `maven-publish`
}

dependencies {
    include(xplibs.io)
    include(xplibs.node)
    include(xplibs.context)
    include(libs.mustache)
    include(libs.router)
}

repositories {
    mavenCentral()
    xp.enonicRepo("dev")
}
