#!/usr/bin/python

import time, sys, os, subprocess, logging, datetime
from epsonprinter import EpsonPrinter
from PIL import Image, ImageEnhance
from utils import is_grey_scale, brightness, init_printer
import functools
from escpos.printer import Usb
import RPi.GPIO as GPIO
from stat import S_ISREG, ST_CTIME, ST_MODE
from pprint import pprint


BASE_WIDTH = 512

p = Usb(0x04b8, 0x0e15)
printer = init_printer(0x04b8, 0x0e15, 1)

GPIO.setmode(GPIO.BCM)
GPIO.setup(21, GPIO.IN, pull_up_down = GPIO.PUD_UP)

trigger = 1

print('WAITING FOR PRESS')

while True:
  trigger = GPIO.input(21)

  if( trigger == 0 ):
   print('BUTTON PRESSED')

## DEFINITION NOM SERIE
   dateDirectory = datetime.datetime.now().strftime('%Y%m%d-%s')

## TAKE PHOTOS
   for x in range(1, 5):
    ## TAKE PHOTO
       filename = dateDirectory +'__' + str(x) + '.jpg'
       pathArchive = os.path.join('./files/archives/', filename)

       print('GETTING FILE')

       os.system('fswebcam -r 1920x1080 --no-banner ' + pathArchive)

    ## ENHANCE PHOTO
       print('RESIZING IMAGE')
       size = BASE_WIDTH, BASE_WIDTH
       img = Image.open(pathArchive)

       width = float(img.size[0])
       height = float(img.size[1])
       img = img.crop((int((width-height)/2), 0, int((width+height)/2), int(height)))
       img.thumbnail(size)

       print('ENHANCING IMAGE')
       brightness = ImageEnhance.Brightness(img)
       img = brightness.enhance(5.0)
       enhancer = ImageEnhance.Contrast(img)
       img = enhancer.enhance(3.0)
       img.save('./files/printables/print_' + str(x) + '.png', 'PNG')


## PRINT LOGO
   print('PRINTING LOGO')
   printer.print_image_from_file('./files/title.png', 1)
   printer.linefeed(1)

## PRINT PHOTOS
   print('PRINTING IMAGES')
   printer.print_image_from_file('./files/printables/print_1.png', 1)
   printer.linefeed(1)
   printer.print_image_from_file('./files/printables/print_2.png', 1)
   printer.linefeed(1)
   printer.print_image_from_file('./files/printables/print_3.png', 1)
   printer.linefeed(1)
   printer.print_image_from_file('./files/printables/print_4.png', 1)

   printer.linefeed(4)
   printer.cut()

## REST AND WAIT FOR BUTTON PRESS
   time.sleep(1)
   trigger = 1
   print('WAITING FOR NEXT PRESS')
