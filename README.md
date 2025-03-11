## An API for a muon-detector, built on nodeJS

This server's function is to act as an API endpoint for a homemade muon detector, built from an arduino.

## 1. API

The API has 4 main functions :

# Epoch

The API has a /epoch endpoint that allows the Arduino to get the current time in seconds since the 1st of January 1970. This allows for the Arduino to know what the current time is. The Arduino then uses the time elapsed since the fetch of the epoch as the current time. In this way, we can know with a good enough accuracy the moment the Arduino detector detected a coincidence.

# Upload new coincidence time (requires API dev key)

The API has a /muons-upload endpoint used by the Arduino to make a POST request and store a new coincidence in the form of an epoch (seconds elapsed since 1/1/1970) onto the server's log.txt file.

# View latest coincidences

The API's /muons/:quantity dynamic endpoint allows a user to fetch the latest _n_ uploaded epochs, replacing :quantity by the number of epochs needed. Eg. : fetch /muons/5 gets the latest 5 coincidences uploaded onto the server.

A more convenient endpoint is the /days/:days, acting just as the /muons one, but retrieves the muons detected in the past _n_ days.

# Retrieve the log file

The log file can be retrieved via /dev/log.txt. 

**WIP** 
It resets each month. Each monthly log file can also be retrieved as soon as i implement it.
**WIP**

## 2. Dashboard site

A simple dashboard-like static site. It shows the current state of the detector, assuming 5 minutes of unrecorded coincidence means that it is down. If the detector's last sent coincidence is more than 5 minutes ago, it is considered down. 
The latest coincidences can also be viewed in the form of a date. This dashboard is accessible by anyone, as it allows no control over the server.

You can find it over at https://server-cosmix.onrender.com/dashboard

# Currently in development

I built this as part of a school project. Please report any bugs or vulnerability issues via the issues tab or a pull request.
