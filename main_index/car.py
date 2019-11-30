from .models import TBook
class Car:
    def __init__(self):
        self.car = []
        self.carid = []
        self.firstprice = 0
        self.lastprice = 0

    def compute(self):
        pass

    def addcar(self,book,number=1):
        if book in self.carid:
            for i in self.car:
                if i.book == book:
                    i.number += number
                    break
        else:
            self.car.append(Car_item(book,number))
            self.carid.append(book)


    def delcar(self,book):
        for i in self.car:
            if i.book == book:
                self.car.remove(i)
                self.carid.remove(book)
                break

    def changecar(self,book,number):
        for i in self.car:
            if i.book == book:
                i.number = number
                break

class Car_item:
    def __init__(self,book,number):
        self.book = book
        self.number = number