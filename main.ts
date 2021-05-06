// Left motor goes forward and right goes backward to turn right
function turn90degreesRight () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
}
// Left motor goes back and right goes forward to turn left
function turn90degreesLeft () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
}
// When a remote control button is pressed. 
// 
// You could change this to Button A pressed if you don't have a working IR
maqueen.IR_callbackUser(function (message) {
    music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Forever)
    // Move forward until you reach the first obstacle 
    while (maqueen.Ultrasonic(PingUnit.Centimeters) > 20) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    }
    maqueen.motorStop(maqueen.Motors.All)
    turn90degreesLeft()
    // Move forward until the line is reached
    while (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    }
    maqueen.motorStop(maqueen.Motors.All)
    turn90degreesRight()
    // Speed up the music and climb the ramp
    music.changeTempoBy(20)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    basic.pause(1000)
    turn90degreesRight()
    // Go forward to the end of the course
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    basic.pause(1000)
    maqueen.motorStop(maqueen.Motors.All)
    // Celebrate
    bailar()
})
function bailar () {
    music.startMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
}
