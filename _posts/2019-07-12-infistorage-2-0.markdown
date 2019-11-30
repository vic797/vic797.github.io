---
layout: post
title: "Infistorage 2.0"
categories: [minecraft, datapacks]
download: https://mega.nz/#!l2QTXAxT!Gpsj-hw3EXPrfp5nXDhVpTDeMmR5dRDfkm2t0bgW0Xo
resume: "InfiStorage 2.0 is a complete rewrite of the original version."
---
# {{ page.title }}

**InfiStorage 2.0** is a complete rewrite of the original version. It features a lot of changes and improvements. It works almost the same as the original but it doesn't require any modules since it makes use of _Item Frames_ instead of _Armor Stands_. This allows the you to take items faster by only rotating the item in the Item Frame.

To make the new set up place a Dropper with an Item Frame on top, rename one of the item you want to store to _Storage_ and put it on the Item Frame. For example if you want to store Dirt (`minecraft:dirt`) rename a block of it to Storage and place it on the Item Frame and now the container will only accept Dirt.

> **Important**: banners and signs are not supported yet.

To store items you can drop them, use Hoppers or Droppers.

If a Hopper pushes an item that can not be stored the container will emit particles indicating that is damaged; to fix it place a Hopper bellow the container.

This new system partially supports feeding items to Hoppers. To do this place a Dropper facing anywhere but up bellow a container and the system will start sending items to it. Make sure that the items go somewhere because if they are not taken on time you will start loosing items.

To take items from the container just rotate the item on the Item Frame and you will get a full stack of 64 or 16 depending of the allowed stack size for that item. Is you have less than 64 (or 16) items you will get all the remaining items in the container.

This new system can be moved since all the container information is stored in the item in the Item Frame.
