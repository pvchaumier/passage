# Guide

## To install

The database is a simple sqlite DB so nothing to do on that side.

It is better to create a virtualenv (with pew for instance) but it is up to you.

Then once it is sourced, run `pip install -r requirements.txt` in the folder containing the requirements.txt file.

Run `./manage.py migrate`

You should be OK now :D


## Launch local webserver

Run `./manage.py runserver`

You can go to local_ip:port/docs for an interactive exploration of the API
