let strip: neopixel.Strip = null
// Left motor goes forward and right goes backward to turn right
function turn90degreesRight () {
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
    basic.pause(325)
    maqueen.motorStop(maqueen.Motors.All)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    basic.pause(200)
}
// Move forward for a particular time in ms
function goForward (HowLong: number) {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    basic.pause(HowLong)
    maqueen.motorStop(maqueen.Motors.All)
}
// Test the ultrasonic sensor
input.onButtonPressed(Button.A, function () {
    basic.showNumber(maqueen.Ultrasonic(PingUnit.Centimeters))
})
function goForwardUntilWall () {
    // Move forward until the ultrasonic reads less than 30 (ignore values of 0 and 255)
    while (maqueen.Ultrasonic(PingUnit.Centimeters) >= 30 || (maqueen.Ultrasonic(PingUnit.Centimeters) == 0 || maqueen.Ultrasonic(PingUnit.Centimeters) == 255)) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    }
    basic.pause(100)
    // Pause and do it again just to ignore noise or incorrect readings.
    while (maqueen.Ultrasonic(PingUnit.Centimeters) >= 30 || (maqueen.Ultrasonic(PingUnit.Centimeters) == 0 || maqueen.Ultrasonic(PingUnit.Centimeters) == 255)) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    }
    maqueen.motorStop(maqueen.Motors.All)
    basic.showNumber(maqueen.Ultrasonic(PingUnit.Centimeters))
    blink()
    basic.pause(200)
}
// Beep and blink the LEDs
function blink () {
    music.playTone(262, music.beat(BeatFraction.Eighth))
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    basic.pause(100)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
}
// Left motor goes back and right goes forward to turn left
function turn90degreesLeft () {
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
    basic.pause(375)
    maqueen.motorStop(maqueen.Motors.All)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    basic.pause(200)
}
function goForwardUntilLine () {
    // Move forward until the line is reached
    while (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    }
    maqueen.motorStop(maqueen.Motors.All)
    blink()
    blink()
    basic.pause(200)
}
// When a remote control button is pressed.
// 
// You could change this to Button A pressed if you don't have a working IR
maqueen.IR_callbackUser(function (message) {
    goForwardUntilWall()
    turn90degreesLeft()
    goForwardUntilLine()
    turn90degreesRight()
    goForward(3500)
    turn90degreesRight()
    goForward(2000)
    // Celebrate
    bailar()
})
// Celebrate!
function bailar () {
    strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    music.playMelody("A F E F D G E F ", 250)
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Orange))
    strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
    strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
    // Spin right
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
    for (let index = 0; index < 20; index++) {
        // Rotate the lights around 20 times
        strip.rotate(1)
        strip.show()
        basic.pause(200)
    }
    maqueen.motorStop(maqueen.Motors.All)
}
