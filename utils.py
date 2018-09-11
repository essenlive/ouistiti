from PIL import Image, ImageStat, Image, ImageDraw, ImageFont, ImageEnhance
import textwrap, os, functools
from epsonprinter import EpsonPrinter

def init_printer(vendorId, machineId, printId):
    printer = EpsonPrinter(vendorId, machineId, printId)
    printer.center()
    printer.bold_on()
    printer.set_print_speed(2)

    return printer

def is_grey_scale(im):
    try:
        w,h = im.size
        for i in range(w):
            for j in range(h):
                r,g,b = im.getpixel((i,j))
                if r != g != b: return False
        return True
    except:
        return True


def brightness(im):
   stat = ImageStat.Stat(im)
   return stat.mean[0]
