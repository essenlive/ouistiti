#!/usr/bin/python

import time, sys, os, subprocess, logging, datetime
from epsonprinter import EpsonPrinter
from escpos.printer import Usb
from PIL import Image, ImageEnhance, ImageStat
from utils import is_grey_scale, brightness, init_printer
import functools



BASE_WIDTH = 512

p = Usb(0x04b8, 0x0e15)
printer = init_printer(0x04b8, 0x0e15, 1)
brightnessAimed = 300
filename = '__38'


BASE_WIDTH = 512

## TAKE PHOTO
os.system('fswebcam -r 1920x1080 --no-banner ./files/' + filename + '__test.jpg')
## ENHANCE PHOTO
print('RESIZING IMAGE')
size = BASE_WIDTH, BASE_WIDTH
img = Image.open('./files/' + filename + '__test.jpg')
width = float(img.size[0])
height = float(img.size[1])
img = img.crop((int((width-height)/2), 0, int((width+height)/2), int(height)))

img.thumbnail(size)
stats = ImageStat.Stat(img)
factor = float("{0:.2f}".format(brightnessAimed/stats.mean[0]))
print(factor)

brightness = ImageEnhance.Brightness(img)
img = brightness.enhance(int(factor))

stats = ImageStat.Stat(img)
print(stats.mean)

img.save('./files/' + filename + '__print.png', 'PNG')

printer.print_image_from_file('./files/' + filename + '__print.png', 1)
printer.print_image_from_file('./files/title.png', 1)
