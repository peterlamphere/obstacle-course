function turn90degreesRight () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
}
function turn90degreesLeft () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
}
maqueen.IR_callbackUser(function (message) {
    while (maqueen.Ultrasonic(PingUnit.Centimeters) > 5) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    }
    turn90degreesLeft()
    while (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    }
    turn90degreesRight()
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    basic.pause(1000)
    turn90degreesRight()
    maqueen.motorStop(maqueen.Motors.All)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    basic.pause(1000)
    maqueen.motorStop(maqueen.Motors.All)
    bailar()
})
function bailar () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
}
