# BillDeathIndex-Website

A website for displaying the results of the BillDeathIndex repo project.

## Currently supported legislation sources

- [x] NYS Senate (OpenLegislation API)
- [ ] US Congress (Planned implementation)

## What is the Bill Death Index?

In the U.S. legislative system, bills can "die in committee". This occurs when a bill is either voted down in a committee or it simply never receives a vote. While the former is easy to track, the latter is not publicized as much. That, coupled with other means of bill deaths such as a pocket veto or it simply being lost in the process, means that solid legislation with large support can be lost. This project is an attempt to keep track of these bills, as well as the various "levels of death" that they're at.

## How are bills rated?

There are four different levels of bill death, as described below.

Mostly Dead (Low): This represents a bill that is dead, but only a bit. This occurs when a bill is inactive for a year, but has previously been approved by a chamber or committee. That means that it has support, but it simply got lost along the way.

Flatlining (Moderate): This represents a slightly more significant bill death, but it's similar to the 'Mostly Dead' level. It occurs when a bill has been inactive for at least a year and was referred back to a committee. This is the traditional death in committee, in which a bill dies simply because it's not voted on in committee.

Clinical (High): This level is a more significant level of death, representing a veto by the governor. Vetoes in any legislative system can take two forms: direct or pocket vetoes. If a directly vetoed bill remains inactive for a year after being vetoed, it gains this rating. If a bill is sent to a governor, but stays inactive for at least thirty days, it's considered pocket vetoed and is given this rating as well.

Six Feet Under (Severe): This is the highest level of death, and represents a likely poor fate for the bill. For a bill to receive this rating, it must meet all of the conditions of the flatlining (moderate) level, or the traditional death in committee (it must have been referred back to a committee and been inactive for four months). However, it must all additionally have lost its original supporters. When cosponsors of a bill leave office, their support is lost for certain bills. When a majority of cosponsors of a bill leave office and the bill is inactive for a year, it gains this rating so long as it meets the moderate conditions. If all of the bill's cosponsors have left office, the requirement of a year of inactivity is lost.

## How does it work?

A [separate program](https://www.github.com/BillDeathIndex) was written to crawl through APIs of legislative bodies (originally the NYS Senate OpenLegislation API). These are then stored to JSON files. Then, these JSON files are imported into a Google Firebase Realtime Database, which allows for quick searching while handling most of the backend itself.

# Attribution

- 
