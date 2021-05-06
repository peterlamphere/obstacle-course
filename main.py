# Left motor goes forward and right goes backward to turn right
def turn90degreesRight():
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
    basic.pause(100)
    maqueen.motor_stop(maqueen.Motors.ALL)
# Left motor goes back and right goes forward to turn left
def turn90degreesLeft():
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 100)
    basic.pause(100)
    maqueen.motor_stop(maqueen.Motors.ALL)
# When a remote control button is pressed. 
# 
# You could change this to Button A pressed if you don't have a working IR

def on_ir_callbackuser(message):
    music.start_melody(music.built_in_melody(Melodies.NYAN), MelodyOptions.FOREVER)
    # Move forward until you reach the first obstacle 
    while maqueen.ultrasonic(PingUnit.CENTIMETERS) > 20:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
    maqueen.motor_stop(maqueen.Motors.ALL)
    turn90degreesLeft()
    # Move forward until the line is reached
    while maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
    maqueen.motor_stop(maqueen.Motors.ALL)
    turn90degreesRight()
    # Speed up the music and climb the ramp
    music.change_tempo_by(20)
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
    basic.pause(1000)
    turn90degreesRight()
    # Go forward to the end of the course
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
    basic.pause(1000)
    maqueen.motor_stop(maqueen.Motors.ALL)
    # Celebrate
    bailar()
maqueen.IR_callbackUser(on_ir_callbackuser)

def bailar():
    music.start_melody(music.built_in_melody(Melodies.BIRTHDAY), MelodyOptions.ONCE)
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 100)