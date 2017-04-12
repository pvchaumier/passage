import os
from subprocess import Popen
import random
import time


with open('conversation.txt') as f:
    conversation = [line for line in f]
conversation = ' '.join(conversation)


voices = ['Thomas', 'Amelie', 'Bruce', 'Agnes', 'Ting-Ting']


##########################


def test():
    jobs = []
    i = 0
    args = ['say',
            '-v', voices[(i % len(voices))],
            conversation]
    p = Popen(args)
    jobs.append(p)
    i += 1

    time.sleep(17)

    while i < 10:
        print(i)
        while len([j for j in jobs if j.poll() is None]) > 1:
            pass
        for j in range(i):
            time.sleep(random.randint(0, 10) / 10)
            args = ['say',
                    '-v', voices[(i % len(voices))],
                    conversation]
            p = Popen(args)
            jobs.append(p)
        i += 1

test()
