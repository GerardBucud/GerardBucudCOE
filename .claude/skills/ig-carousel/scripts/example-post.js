// The first post on the board ("Steal my DJI Osmo Nano settings") as stored in its db, for reference when
// building a new post: copy the shapes, not the asset ids (those photos already live in the shared library).
// `guide` is the post's PDF guide (posts/<pid>/guide/main); `photos` is the shared library at the time of writing.
// The post is 3:4 (`meta.ratio`); its slides follow it. Slide s05 has `alt: true`: it is version 2 of slide 04 (same number, not counted).
module.exports = {
  "pid": "osmo-nano-settings",
  "meta": {
    "handle": "@GAB.WONDERS",
    "order": [
      "s01",
      "s02",
      "s04",
      "smvjrud8b1ru",
      "s05",
      "s03",
      "s06"
    ],
    "overall": "",
    "pdf": false,
    "series": "STEAL MY SETTINGS",
    "subject": "DJI OSMO NANO",
    "title": "Steal my DJI Osmo Nano settings",
    "ratio": "3:4"
  },
  "slides": {
    "s01": {
      "comment": "",
      "img": {
        "adj": {
          "grain": 11
        },
        "asset": "db2f6a4bef5d57e38f6c4f4cafa7a965",
        "fx": 0.49,
        "fy": 0.5,
        "zoom": 1
      },
      "layout": {},
      "status": "ok",
      "text": {
        "foot": "SWIPE FOR MORE",
        "left": "",
        "right": "",
        "section": "CAMERA SETUP",
        "sub": "",
        "title": ""
      },
      "type": "cover"
    },
    "s02": {
      "comment": "",
      "img": {
        "adj": {
          "grain": 11
        },
        "asset": "bc6f3da763b134e56c7d878713e12785",
        "fx": 0.49,
        "fy": 0,
        "zoom": 1.12
      },
      "layout": {},
      "status": "ok",
      "stickers": [],
      "text": {
        "foot": "SAVE FOR LATER",
        "rows": [
          {
            "label": "RESOLUTION",
            "note": "MAX DETAIL + ROOM TO CROP",
            "value": "4K"
          },
          {
            "label": "FRAME RATE",
            "note": "THE CINEMATIC 24P LOOK. SMOOTH, NATURAL MOTION",
            "value": "24FPS"
          },
          {
            "label": "ASPECT RATIO",
            "note": "MY DEFAULT FOR MOST SHOOTS",
            "value": "16:9"
          }
        ],
        "section": "VIDEO FORMAT",
        "tip": "SWITCH TO 4:3. THE TALLER FRAME LETS YOU CROP PORTRAIT + LANDSCAPE FROM ONE CLIP",
        "tipK": "SHOOTING FOR BOTH?"
      },
      "type": "specs"
    },
    "s03": {
      "comment": "",
      "img": {
        "adj": {
          "grain": 11
        },
        "asset": "4c13e7ba10d8789c01d805206af1e9d6",
        "fx": 0.5,
        "fy": 0.5,
        "zoom": 1
      },
      "layout": {},
      "overlay": false,
      "status": "ok",
      "text": {
        "foot": "SAVE FOR LATER",
        "rows": [
          {
            "label": "MODE",
            "note": "MANUAL CONTROL OVER SHUTTER, ISO + WHITE BALANCE",
            "value": "PRO"
          },
          {
            "label": "COLOR",
            "note": "FLAT ON PURPOSE. KEEPS MORE HIGHLIGHT + SHADOW DETAIL FOR YOUR GRADE",
            "value": "D-LOG M"
          }
        ],
        "section": "COLOR PROFILE",
        "tip": "LOG LOOKS GREY OUT OF CAMERA. THAT’S NORMAL. GRADE IT OR ADD A LUT IN POST",
        "tipK": "HEADS UP"
      },
      "type": "specs"
    },
    "s04": {
      "comment": "",
      "img": {
        "adj": {
          "grain": 11
        },
        "asset": "175f51f39d256ef7045f71a4892ead94",
        "fx": 0.5,
        "fy": 0.76,
        "zoom": 1.1
      },
      "layout": {
        "panel": "auto",
        "pos": "bottom",
        "scrim": "auto"
      },
      "status": "ok",
      "text": {
        "foot": "SAVE FOR LATER",
        "rows": [
          {
            "label": "SHUTTER",
            "note": "THE 180° RULE: DOUBLE YOUR FRAME RATE FOR NATURAL MOTION BLUR",
            "value": "1/50"
          },
          {
            "label": "ISO",
            "note": "KEEP IT IN THIS RANGE TO MINIMIZE NOISE",
            "value": "100–1600"
          },
          {
            "label": "EV · NORMAL DAY",
            "note": "A TOUCH UNDER TO KEEP YOUR HIGHLIGHTS SAFE",
            "value": "−0.3"
          },
          {
            "label": "EV · PEAK SUN",
            "note": "HARSH MIDDAY SUN. YOU CAN LIFT SHADOWS, BUT BLOWN HIGHLIGHTS ARE GONE",
            "value": "−1.0"
          }
        ],
        "section": "EXPOSURE",
        "tip": "SWITCH TO SUPER NIGHT MODE AND USE ANY LIGHT AROUND YOU: STREET LAMPS, SHOP WINDOWS, NEON SIGNS",
        "tipK": "SHOOTING AT NIGHT?"
      },
      "type": "specs"
    },
    "s05": {
      "alt": true,
      "comment": "",
      "img": null,
      "img2": null,
      "layout": {},
      "overlay": true,
      "status": "ok",
      "text": {
        "aLabel": "D-LOG M",
        "aNote": "STRAIGHT OUT OF CAMERA. FLAT ON PURPOSE",
        "aValue": "BEFORE",
        "bLabel": "GRADED",
        "bNote": "THE SAME CLIP AFTER THE COLOR GRADE",
        "bValue": "AFTER",
        "foot": "SAVE FOR LATER",
        "section": "BEFORE / AFTER"
      },
      "type": "beforeafter"
    },
    "s06": {
      "comment": "",
      "img": {
        "adj": {
          "grain": 11
        },
        "asset": "677ab14f12c48e4e2c23d861971f4d57",
        "fx": 0.5,
        "fy": 0.5,
        "zoom": 1
      },
      "layout": {},
      "status": "review",
      "stickers": [
        {
          "id": "kbookmark1",
          "kind": "bookmark",
          "rot": 0,
          "size": 158,
          "solid": false,
          "x": 0.8813265455954978,
          "y": 0.3382
        },
        {
          "id": "kmvjvho4kesi",
          "kind": "keyword",
          "label": "COMMENT “SETTINGS” to receive a free pdf guide",
          "rot": 0,
          "size": 120,
          "x": 0.5,
          "y": 0.6963
        }
      ],
      "text": {
        "big": "**SAVE** FOR **LATER**",
        "foot": "SEND TO A FRIEND",
        "left": "DON’T LOSE",
        "right": "THESE",
        "section": "CAMERA SETUP",
        "sub": "FOLLOW **{handle}**"
      },
      "type": "save"
    },
    "smvjrud8b1ru": {
      "alt": false,
      "comment": "",
      "img": {
        "adj": {
          "exposure": 0,
          "grain": 17
        },
        "asset": "17cb875bd2367c42f43b2c50fa2ff74b",
        "fx": 0.5,
        "fy": 0.5,
        "zoom": 1
      },
      "img2": {
        "adj": {
          "grain": 19
        },
        "asset": "a9bdb495a31e2fc9c0a77a27fc983916",
        "fx": 0.5,
        "fy": 0.5,
        "zoom": 1
      },
      "layout": {},
      "overlay": false,
      "status": "ok",
      "text": {
        "aLabel": "D-LOG M",
        "aNote": "STRAIGHT OUT OF CAMERA. FLAT ON PURPOSE",
        "aValue": "BEFORE",
        "bLabel": "GRADED",
        "bNote": "THE SAME CLIP AFTER THE COLOR GRADE",
        "bValue": "AFTER",
        "foot": "SAVE FOR LATER",
        "section": "BEFORE / AFTER"
      },
      "type": "beforeafter"
    }
  },
  "guide": {
    "cheatsheet": true,
    "comment": "",
    "cta": "FOLLOW {handle}",
    "intro": "These are the exact settings I use on my DJI Osmo Nano, plus the reasoning behind each one. Use them as your starting point, shoot a few test clips in your own light, and adjust from there.",
    "outro": "That's my full setup. Shoot a few test clips in different light, keep what works for you, and adjust the rest. If this helped, follow me for more Osmo Nano tips and send this guide to a friend who just got one.",
    "sections": [
      {
        "body": "Before anything else, decide how the camera records. Resolution, frame rate and aspect ratio set how much detail you keep, how motion feels, and where the clip can end up.",
        "comment": "",
        "heading": "VIDEO FORMAT",
        "id": "g1",
        "points": "**4K:** More resolution than you'll post, and that's the point. You can crop, reframe or stabilise in the edit and still export a sharp 1080p or 4K video.\n**24FPS:** The frame rate of film. Movement gets a soft, natural blur that reads as cinematic, instead of the hyper-smooth look of 30 or 60fps phone video.\n**Higher frame rates:** Only when you plan to slow the clip down in the edit.\n**16:9:** My default for most shoots. It fits YouTube and widescreen edits, and it crops easily to 4:5 for the feed.\n**4:3 when you need both:** The taller frame leaves room to cut a 9:16 vertical and a 16:9 horizontal from the same clip, so one take covers Reels and YouTube.",
        "slide": "s02"
      },
      {
        "body": "This is where the cinematic look comes from: shoot flat, then finish the color yourself in the edit.",
        "comment": "",
        "heading": "COLOR PROFILE",
        "id": "g2",
        "points": "**Pro mode:** Manual control over shutter, ISO and white balance, instead of the camera guessing shot by shot. Every clip matches, so the edit goes faster.\n**D-Log M:** A flat log profile that holds more detail in the highlights and shadows. Straight out of camera it looks grey and washed out. That's normal.\n**Grade it:** Start with a D-Log M to Rec.709 LUT (DJI publishes official LUTs for its D-Log M cameras), then fine-tune exposure, contrast and saturation by eye.\n**Set white balance yourself:** With auto white balance the color can drift mid-clip. A fixed setting keeps skin tones consistent.",
        "slide": "s03"
      },
      {
        "body": "Exposure is where most footage falls apart. These settings keep motion natural, noise low and highlights safe.",
        "comment": "",
        "heading": "EXPOSURE",
        "id": "g3",
        "points": "**Shutter 1/50:** The 180° rule. Set your shutter to about double your frame rate (24fps × 2 ≈ 1/50) for natural motion blur. Much faster shutter speeds make movement look choppy.\n**ISO 100–1600:** Keep ISO in this range. Higher ISO brightens the image but adds noise, and log footage shows that noise once you grade it.\n**EV −0.3 on a normal day:** A touch of underexposure keeps skies and bright skin from clipping. You can lift shadows in the edit, but blown highlights are gone for good.\n**EV −1.0 in peak sun:** Harsh midday light clips fast, so pull exposure down further.\n**Bright days:** At 1/50 in full sun the image can still be too bright, even at ISO 100. An ND filter cuts the light so you can keep the 1/50 shutter.\n**At night:** Switch to Super Night mode and use any light around you: street lamps, shop windows, neon signs. Light in the frame adds mood and keeps noise down.",
        "slide": "s04"
      },
      {
        "body": "Here's the whole workflow on one clip: D-Log M straight out of camera, then after the grade.",
        "comment": "",
        "heading": "BEFORE / AFTER",
        "id": "g4",
        "points": "**Before:** Flat and grey on purpose. All the detail is there; it just needs contrast and color.\n**After:** A LUT plus small changes to exposure, contrast and saturation brings it back to life, without clipped highlights.\n**Edit anywhere:** Most editing apps, mobile ones included, let you adjust exposure, contrast and saturation, and many accept .cube LUT files.",
        "slide": "s05"
      }
    ],
    "subtitle": "The full guide: every setting I shoot with, and why it works",
    "title": "STEAL MY DJI OSMO NANO SETTINGS"
  },
  "photos": {
    "175f51f39d256ef7045f71a4892ead94": {
      "addedAt": 1792683635368,
      "asset": "175f51f39d256ef7045f71a4892ead94",
      "desc": "Osmo Nano on a cutting mat in window light",
      "folder": "",
      "h": 4128,
      "name": "GAB07890",
      "ph": "d5cdcdcc4cf0f0f8",
      "tags": [
        "osmo nano",
        "camera",
        "flat lay",
        "top down",
        "cutting mat",
        "window light",
        "shadows",
        "blue"
      ],
      "updatedAt": 1792683635593,
      "w": 6192
    },
    "17cb875bd2367c42f43b2c50fa2ff74b": {
      "addedAt": 1792687609526,
      "asset": "17cb875bd2367c42f43b2c50fa2ff74b",
      "desc": "Airplane wing above the clouds, flat log look",
      "folder": "",
      "h": 2880,
      "name": "dji_export_20261023_photo_0003",
      "ph": "e76767f7d71f1fa7",
      "tags": [
        "airplane",
        "wing",
        "clouds",
        "sky",
        "window view",
        "travel",
        "d-log",
        "before"
      ],
      "updatedAt": 1792687610268,
      "w": 3840
    },
    "20f28d42d4369841922e86264087bdd7": {
      "addedAt": 1792674435101,
      "asset": "20f28d42d4369841922e86264087bdd7",
      "desc": "Hand holding Osmo Nano in a soft orange spotlight",
      "folder": "Osmo Nano/Spotlight",
      "h": 2576,
      "name": "Muted spot, hand",
      "ph": "0333f8ecc8cce90f",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "spotlight",
        "orange",
        "dark",
        "moody"
      ],
      "updatedAt": 1792674524101,
      "w": 1717
    },
    "283845a91bf899d4fe1c15c1003b1e78": {
      "addedAt": 1792674434101,
      "asset": "283845a91bf899d4fe1c15c1003b1e78",
      "desc": "Red-lit hand holding Osmo Nano in an orange spotlight",
      "folder": "Osmo Nano/Spotlight",
      "h": 2576,
      "name": "Orange spot, red-lit hand",
      "ph": "c0f0f0ccccccfcf0",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "spotlight",
        "orange",
        "red light",
        "close-up",
        "moody"
      ],
      "updatedAt": 1792674524101,
      "w": 1717
    },
    "33f82795061a3db7f6e3845070c903df": {
      "addedAt": 1792674425101,
      "asset": "33f82795061a3db7f6e3845070c903df",
      "desc": "Finished cover: Steal my DJI Osmo Nano settings",
      "folder": "Osmo Nano/Finished covers",
      "h": 2700,
      "name": "Your finished cover",
      "ph": "c074389c88f0f0b2",
      "tags": [
        "cover",
        "finished",
        "title",
        "red",
        "hand",
        "osmo nano",
        "text"
      ],
      "updatedAt": 1792674524101,
      "w": 1800
    },
    "4c13e7ba10d8789c01d805206af1e9d6": {
      "addedAt": 1792674427101,
      "asset": "4c13e7ba10d8789c01d805206af1e9d6",
      "desc": "Desk flat lay with Osmo Nano, drone and light bar",
      "folder": "Osmo Nano/Flat lays and details",
      "h": 1717,
      "name": "Desk flat lay, light bar (wide)",
      "ph": "e6c2caeaeafefcf8",
      "tags": [
        "flat lay",
        "desk",
        "osmo nano",
        "drone",
        "keyboard",
        "light bar",
        "top down",
        "wide"
      ],
      "updatedAt": 1792674524101,
      "w": 2576
    },
    "4cda8eb4c0538f2016c3dacf6711b908": {
      "addedAt": 1792674428101,
      "asset": "4cda8eb4c0538f2016c3dacf6711b908",
      "desc": "Desk flat lay with Osmo Nano, drone and keyboard",
      "folder": "Osmo Nano/Flat lays and details",
      "h": 1717,
      "name": "Desk flat lay, drone (wide)",
      "ph": "f2facaeae8fafefd",
      "tags": [
        "flat lay",
        "desk",
        "osmo nano",
        "drone",
        "keyboard",
        "yellow lamp",
        "top down",
        "wide"
      ],
      "updatedAt": 1792674524101,
      "w": 2576
    },
    "66a77b430b1b8ac5992667eff07da6c1": {
      "addedAt": 1792674426101,
      "asset": "66a77b430b1b8ac5992667eff07da6c1",
      "desc": "Osmo Nano with its screen on, on a cutting mat",
      "folder": "Osmo Nano/Flat lays and details",
      "h": 1717,
      "name": "Flat lay, screen on (wide)",
      "ph": "188f8ed4dcd474b5",
      "tags": [
        "flat lay",
        "osmo nano",
        "screen",
        "cutting mat",
        "yellow lamp",
        "top down",
        "detail",
        "wide"
      ],
      "updatedAt": 1792674524101,
      "w": 2576
    },
    "677ab14f12c48e4e2c23d861971f4d57": {
      "addedAt": 1792674424101,
      "asset": "677ab14f12c48e4e2c23d861971f4d57",
      "desc": "Hand holding Osmo Nano from above on red",
      "folder": "Osmo Nano/Red backdrop",
      "h": 2576,
      "name": "Red, hand from top (your cover grade)",
      "ph": "c070389c88f0f0e0",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "red",
        "red backdrop",
        "top down",
        "cover grade"
      ],
      "updatedAt": 1792674524101,
      "w": 1717
    },
    "804a33a78e6aa6c302895d8c595e01c7": {
      "addedAt": 1792674430101,
      "asset": "804a33a78e6aa6c302895d8c595e01c7",
      "desc": "Black-and-white hand holding Osmo Nano in orange light",
      "folder": "Osmo Nano/Spotlight",
      "h": 2576,
      "name": "Orange spot, black-and-white hand",
      "ph": "f0f0f0cccccce8e0",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "spotlight",
        "orange",
        "black and white",
        "moody"
      ],
      "updatedAt": 1792674524101,
      "w": 1717
    },
    "8658071a8ef496f4dc1332b2d66a67da": {
      "addedAt": 1792674429101,
      "asset": "8658071a8ef496f4dc1332b2d66a67da",
      "desc": "Osmo Nano close-up with OSMO on the screen",
      "folder": "Osmo Nano/Flat lays and details",
      "h": 2576,
      "name": "Detail, OSMO on screen",
      "ph": "f080104f0d0f7937",
      "tags": [
        "osmo nano",
        "detail",
        "close-up",
        "screen",
        "lens",
        "cutting mat",
        "yellow lamp"
      ],
      "updatedAt": 1792674524101,
      "w": 1717
    },
    "97e0cbb6d431ca2f129c3d6d1c0f46e3": {
      "addedAt": 1792674431101,
      "asset": "97e0cbb6d431ca2f129c3d6d1c0f46e3",
      "desc": "Hand holding Osmo Nano in a blue spotlight",
      "folder": "Osmo Nano/Spotlight",
      "h": 2576,
      "name": "Blue spot",
      "ph": "e0c0f0f8ccccd4e0",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "spotlight",
        "blue",
        "dark",
        "moody"
      ],
      "updatedAt": 1792674524101,
      "w": 1717
    },
    "9ab2ec737ad4651aacaa50b52ca031b1": {
      "addedAt": 1792687613181,
      "asset": "9ab2ec737ad4651aacaa50b52ca031b1",
      "desc": "Airplane wing above the clouds, flat log look",
      "folder": "",
      "h": 2880,
      "name": "dji_export_20261023_photo_0003",
      "ph": "e76767f7d71f1fa7",
      "tags": [
        "airplane",
        "wing",
        "clouds",
        "sky",
        "window view",
        "travel",
        "d-log",
        "duplicate"
      ],
      "updatedAt": 1792687613911,
      "w": 3840
    },
    "9d2ffe12cf300d96923beac4598f8eb7": {
      "addedAt": 1792674438101,
      "asset": "9d2ffe12cf300d96923beac4598f8eb7",
      "desc": "Hand holding Osmo Nano sideways in a red spotlight",
      "folder": "Osmo Nano/Red backdrop",
      "h": 1717,
      "name": "Red spot, side view (wide)",
      "ph": "e0f0f0943c3874fe",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "spotlight",
        "red",
        "side view",
        "wide"
      ],
      "updatedAt": 1792674524101,
      "w": 2576
    },
    "a9bdb495a31e2fc9c0a77a27fc983916": {
      "addedAt": 1792687496207,
      "asset": "a9bdb495a31e2fc9c0a77a27fc983916",
      "desc": "Airplane wing above the clouds, graded",
      "folder": "",
      "h": 2880,
      "name": "dji_export_20261023_photo_0004",
      "ph": "efe7e7ffde9f9f27",
      "tags": [
        "airplane",
        "wing",
        "clouds",
        "sky",
        "blue",
        "window view",
        "travel",
        "after"
      ],
      "updatedAt": 1792687496409,
      "w": 3840
    },
    "b2cacba14bdb8c9085c6f1ae2115e62a": {
      "addedAt": 1792674432101,
      "asset": "b2cacba14bdb8c9085c6f1ae2115e62a",
      "desc": "Hand from the left holding Osmo Nano in orange light",
      "folder": "Osmo Nano/Spotlight",
      "h": 2576,
      "name": "Orange spot, hand from left",
      "ph": "e3f0f0ecccec10f3",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "spotlight",
        "orange",
        "dark",
        "moody"
      ],
      "updatedAt": 1792674524101,
      "w": 1717
    },
    "bc6f3da763b134e56c7d878713e12785": {
      "addedAt": 1792674437101,
      "asset": "bc6f3da763b134e56c7d878713e12785",
      "desc": "Hand holding Osmo Nano on a red backdrop",
      "folder": "Osmo Nano/Red backdrop",
      "h": 1717,
      "name": "Red, hand from left 2 (wide)",
      "ph": "d0f0f0c89c1c78fc",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "red",
        "red backdrop",
        "lens",
        "wide"
      ],
      "updatedAt": 1792674524101,
      "w": 2576
    },
    "d7e173f05177b25531d1d94654abe168": {
      "addedAt": 1792674433101,
      "asset": "d7e173f05177b25531d1d94654abe168",
      "desc": "Hand from below holding Osmo Nano in a red spotlight",
      "folder": "Osmo Nano/Spotlight",
      "h": 2576,
      "name": "Red spot, hand from below",
      "ph": "e0f0f0ccccf8e0c0",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "spotlight",
        "red",
        "dark",
        "moody"
      ],
      "updatedAt": 1792674524101,
      "w": 1717
    },
    "db2f6a4bef5d57e38f6c4f4cafa7a965": {
      "addedAt": 1792674440101,
      "asset": "db2f6a4bef5d57e38f6c4f4cafa7a965",
      "desc": "Cover with big title: Steal my DJI Osmo Nano settings",
      "folder": "Osmo Nano/Finished covers",
      "h": 2700,
      "name": "Your cover, big title version",
      "ph": "c063389c88f0f0e0",
      "tags": [
        "cover",
        "finished",
        "title",
        "red",
        "hand",
        "osmo nano",
        "text"
      ],
      "updatedAt": 1792674524101,
      "w": 1800
    },
    "e664a74c69eb06d8a5a91f4fb514e4fc": {
      "addedAt": 1792685312629,
      "asset": "e664a74c69eb06d8a5a91f4fb514e4fc",
      "desc": "Home studio setup with a softbox and red light",
      "folder": "",
      "h": 4032,
      "name": "IMG_1868",
      "ph": "90e0b0ec6c141424",
      "tags": [
        "behind the scenes",
        "studio",
        "softbox",
        "red light",
        "tripod",
        "bedroom",
        "lighting setup"
      ],
      "updatedAt": 1792685312629,
      "w": 3024
    },
    "fedc95eb05f354dbfd1204dda79da461": {
      "addedAt": 1792674439101,
      "asset": "fedc95eb05f354dbfd1204dda79da461",
      "desc": "Hand holding Osmo Nano from above on red, ungraded",
      "folder": "Osmo Nano/Red backdrop",
      "h": 2576,
      "name": "Red, hand from top (raw)",
      "ph": "c070389c88f0f0e0",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "red",
        "red backdrop",
        "top down",
        "raw"
      ],
      "updatedAt": 1792674524101,
      "w": 1717
    },
    "ffe72b5d4602c259c7f92c29310bb8ec": {
      "addedAt": 1792674436101,
      "asset": "ffe72b5d4602c259c7f92c29310bb8ec",
      "desc": "Hand holding Osmo Nano on a red backdrop",
      "folder": "Osmo Nano/Red backdrop",
      "h": 1684,
      "name": "Red, hand from left (wide)",
      "ph": "f8f8c8c6941c7cfc",
      "tags": [
        "osmo nano",
        "camera",
        "hand",
        "red",
        "red backdrop",
        "screen",
        "wide"
      ],
      "updatedAt": 1792674524101,
      "w": 2527
    }
  }
};
