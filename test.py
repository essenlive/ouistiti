#!/usr/bin/python

import time, sys, os, subprocess, logging, datetime
from PIL import Image, ImageEnhance
from utils import is_grey_scale, brightness, init_printer
import functools


BASE_WIDTH = 512

## TAKE PHOTO
os.system('fswebcam -r 1920x1080 --no-banner ./files/__25__print.jpg')
## ENHANCE PHOTO
print('RESIZING IMAGE')
size = BASE_WIDTH, BASE_WIDTH
img = Image.open('./files/__25__print.jpg')
width = float(img.size[0])
height = float(img.size[1])
img = img.crop((int((width-height)/2), 0, int((width+height)/2), int(height)))

img.thumbnail(size)

brightness = ImageEnhance.Brightness(img)
img = brightness.enhance(5.0)
contrast = ImageEnhance.Contrast(img)
img = contrast.enhance(3.0)

img.save('./files/__25__print.png', 'PNG')
