import { writable } from "svelte/store";

// Source: https://github.com/vasturiano/three-globe/blob/master/example/basic/index.html
const pointsCount = 20;
const _pointsData = [...Array(pointsCount).keys()].map(() => ({
  // type: "Point",
	lat: (Math.random() - 0.5) * 180,
	lng: (Math.random() - 0.5) * 360,
	size: Math.random() / 3,
	color: ['salmon', 'goldenrod', 'dodgerblue', 'lightseagreen'][Math.round(Math.random() * 3)]
}));

// Source: https://github.com/vasturiano/three-globe/blob/master/example/links/index.html
const arcsCount = 20;
const _arcsData = [...Array(arcsCount).keys()].map(() => ({
  // type: "Arc",
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: ['salmon', 'goldenrod', 'dodgerblue', 'lightseagreen'][Math.round(Math.random() * 3)]
}));


export const pointsData = writable(_pointsData)
export const arcsData = writable(_arcsData)
export const displayData = writable<any>(null);

export const hexData = [
  {
      "type": "Feature",
      "properties": {
          "scalerank": 1,
          "featurecla": "Admin-0 country",
          "LABELRANK": 3,
          "SOVEREIGNT": "Afghanistan",
          "SOV_A3": "AFG",
          "ADM0_DIF": 0,
          "LEVEL": 2,
          "TYPE": "Sovereign country",
          "ADMIN": "Afghanistan",
          "ADM0_A3": "AFG",
          "GEOU_DIF": 0,
          "GEOUNIT": "Afghanistan",
          "GU_A3": "AFG",
          "SU_DIF": 0,
          "SUBUNIT": "Afghanistan",
          "SU_A3": "AFG",
          "BRK_DIFF": 0,
          "NAME": "Afghanistan",
          "NAME_LONG": "Afghanistan",
          "BRK_A3": "AFG",
          "BRK_NAME": "Afghanistan",
          "BRK_GROUP": null,
          "ABBREV": "Afg.",
          "POSTAL": "AF",
          "FORMAL_EN": "Islamic State of Afghanistan",
          "FORMAL_FR": null,
          "NAME_CIAWF": "Afghanistan",
          "NOTE_ADM0": null,
          "NOTE_BRK": null,
          "NAME_SORT": "Afghanistan",
          "NAME_ALT": null,
          "MAPCOLOR7": 5,
          "MAPCOLOR8": 6,
          "MAPCOLOR9": 8,
          "MAPCOLOR13": 7,
          "POP_EST": 34124811,
          "POP_RANK": 15,
          "GDP_MD_EST": 64080,
          "POP_YEAR": 2017,
          "LASTCENSUS": 1979,
          "GDP_YEAR": 2016,
          "ECONOMY": "7. Least developed region",
          "INCOME_GRP": "5. Low income",
          "WIKIPEDIA": -99,
          "FIPS_10_": "AF",
          "ISO_A2": "AF",
          "ISO_A3": "AFG",
          "ISO_A3_EH": "AFG",
          "ISO_N3": "004",
          "UN_A3": "004",
          "WB_A2": "AF",
          "WB_A3": "AFG",
          "WOE_ID": 23424739,
          "WOE_ID_EH": 23424739,
          "WOE_NOTE": "Exact WOE match as country",
          "ADM0_A3_IS": "AFG",
          "ADM0_A3_US": "AFG",
          "ADM0_A3_UN": -99,
          "ADM0_A3_WB": -99,
          "CONTINENT": "Asia",
          "REGION_UN": "Asia",
          "SUBREGION": "Southern Asia",
          "REGION_WB": "South Asia",
          "NAME_LEN": 11,
          "LONG_LEN": 11,
          "ABBREV_LEN": 4,
          "TINY": -99,
          "HOMEPART": 1,
          "MIN_ZOOM": 0,
          "MIN_LABEL": 3,
          "MAX_LABEL": 7
      },
      "bbox": [
          60.52843,
          29.318572,
          75.158028,
          38.486282
      ],
      "geometry": {
          "type": "Polygon",
          "coordinates": [
              [
                  [
                      61.210817,
                      35.650072
                  ],
                  [
                      62.230651,
                      35.270664
                  ],
                  [
                      62.984662,
                      35.404041
                  ],
                  [
                      63.193538,
                      35.857166
                  ],
                  [
                      63.982896,
                      36.007957
                  ],
                  [
                      64.546479,
                      36.312073
                  ],
                  [
                      64.746105,
                      37.111818
                  ],
                  [
                      65.588948,
                      37.305217
                  ],
                  [
                      65.745631,
                      37.661164
                  ],
                  [
                      66.217385,
                      37.39379
                  ],
                  [
                      66.518607,
                      37.362784
                  ],
                  [
                      67.075782,
                      37.356144
                  ],
                  [
                      67.83,
                      37.144994
                  ],
                  [
                      68.135562,
                      37.023115
                  ],
                  [
                      68.859446,
                      37.344336
                  ],
                  [
                      69.196273,
                      37.151144
                  ],
                  [
                      69.518785,
                      37.608997
                  ],
                  [
                      70.116578,
                      37.588223
                  ],
                  [
                      70.270574,
                      37.735165
                  ],
                  [
                      70.376304,
                      38.138396
                  ],
                  [
                      70.806821,
                      38.486282
                  ],
                  [
                      71.348131,
                      38.258905
                  ],
                  [
                      71.239404,
                      37.953265
                  ],
                  [
                      71.541918,
                      37.905774
                  ],
                  [
                      71.448693,
                      37.065645
                  ],
                  [
                      71.844638,
                      36.738171
                  ],
                  [
                      72.193041,
                      36.948288
                  ],
                  [
                      72.63689,
                      37.047558
                  ],
                  [
                      73.260056,
                      37.495257
                  ],
                  [
                      73.948696,
                      37.421566
                  ],
                  [
                      74.980002,
                      37.41999
                  ],
                  [
                      75.158028,
                      37.133031
                  ],
                  [
                      74.575893,
                      37.020841
                  ],
                  [
                      74.067552,
                      36.836176
                  ],
                  [
                      72.920025,
                      36.720007
                  ],
                  [
                      71.846292,
                      36.509942
                  ],
                  [
                      71.262348,
                      36.074388
                  ],
                  [
                      71.498768,
                      35.650563
                  ],
                  [
                      71.613076,
                      35.153203
                  ],
                  [
                      71.115019,
                      34.733126
                  ],
                  [
                      71.156773,
                      34.348911
                  ],
                  [
                      70.881803,
                      33.988856
                  ],
                  [
                      69.930543,
                      34.02012
                  ],
                  [
                      70.323594,
                      33.358533
                  ],
                  [
                      69.687147,
                      33.105499
                  ],
                  [
                      69.262522,
                      32.501944
                  ],
                  [
                      69.317764,
                      31.901412
                  ],
                  [
                      68.926677,
                      31.620189
                  ],
                  [
                      68.556932,
                      31.71331
                  ],
                  [
                      67.792689,
                      31.58293
                  ],
                  [
                      67.683394,
                      31.303154
                  ],
                  [
                      66.938891,
                      31.304911
                  ],
                  [
                      66.381458,
                      30.738899
                  ],
                  [
                      66.346473,
                      29.887943
                  ],
                  [
                      65.046862,
                      29.472181
                  ],
                  [
                      64.350419,
                      29.560031
                  ],
                  [
                      64.148002,
                      29.340819
                  ],
                  [
                      63.550261,
                      29.468331
                  ],
                  [
                      62.549857,
                      29.318572
                  ],
                  [
                      60.874248,
                      29.829239
                  ],
                  [
                      61.781222,
                      30.73585
                  ],
                  [
                      61.699314,
                      31.379506
                  ],
                  [
                      60.941945,
                      31.548075
                  ],
                  [
                      60.863655,
                      32.18292
                  ],
                  [
                      60.536078,
                      32.981269
                  ],
                  [
                      60.9637,
                      33.528832
                  ],
                  [
                      60.52843,
                      33.676446
                  ],
                  [
                      60.803193,
                      34.404102
                  ],
                  [
                      61.210817,
                      35.650072
                  ]
              ]
          ]
      }
  },
  {
      "type": "Feature",
      "properties": {
          "scalerank": 1,
          "featurecla": "Admin-0 country",
          "LABELRANK": 3,
          "SOVEREIGNT": "Angola",
          "SOV_A3": "AGO",
          "ADM0_DIF": 0,
          "LEVEL": 2,
          "TYPE": "Sovereign country",
          "ADMIN": "Angola",
          "ADM0_A3": "AGO",
          "GEOU_DIF": 0,
          "GEOUNIT": "Angola",
          "GU_A3": "AGO",
          "SU_DIF": 0,
          "SUBUNIT": "Angola",
          "SU_A3": "AGO",
          "BRK_DIFF": 0,
          "NAME": "Angola",
          "NAME_LONG": "Angola",
          "BRK_A3": "AGO",
          "BRK_NAME": "Angola",
          "BRK_GROUP": null,
          "ABBREV": "Ang.",
          "POSTAL": "AO",
          "FORMAL_EN": "People's Republic of Angola",
          "FORMAL_FR": null,
          "NAME_CIAWF": "Angola",
          "NOTE_ADM0": null,
          "NOTE_BRK": null,
          "NAME_SORT": "Angola",
          "NAME_ALT": null,
          "MAPCOLOR7": 3,
          "MAPCOLOR8": 2,
          "MAPCOLOR9": 6,
          "MAPCOLOR13": 1,
          "POP_EST": 29310273,
          "POP_RANK": 15,
          "GDP_MD_EST": 189000,
          "POP_YEAR": 2017,
          "LASTCENSUS": 1970,
          "GDP_YEAR": 2016,
          "ECONOMY": "7. Least developed region",
          "INCOME_GRP": "3. Upper middle income",
          "WIKIPEDIA": -99,
          "FIPS_10_": "AO",
          "ISO_A2": "AO",
          "ISO_A3": "AGO",
          "ISO_A3_EH": "AGO",
          "ISO_N3": "024",
          "UN_A3": "024",
          "WB_A2": "AO",
          "WB_A3": "AGO",
          "WOE_ID": 23424745,
          "WOE_ID_EH": 23424745,
          "WOE_NOTE": "Exact WOE match as country",
          "ADM0_A3_IS": "AGO",
          "ADM0_A3_US": "AGO",
          "ADM0_A3_UN": -99,
          "ADM0_A3_WB": -99,
          "CONTINENT": "Africa",
          "REGION_UN": "Africa",
          "SUBREGION": "Middle Africa",
          "REGION_WB": "Sub-Saharan Africa",
          "NAME_LEN": 6,
          "LONG_LEN": 6,
          "ABBREV_LEN": 4,
          "TINY": -99,
          "HOMEPART": 1,
          "MIN_ZOOM": 0,
          "MIN_LABEL": 3,
          "MAX_LABEL": 7
      },
      "bbox": [
          11.640096,
          -17.930636,
          24.079905,
          -4.438023
      ],
      "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
              [
                  [
                      [
                          23.904154,
                          -11.722282
                      ],
                      [
                          24.079905,
                          -12.191297
                      ],
                      [
                          23.930922,
                          -12.565848
                      ],
                      [
                          24.016137,
                          -12.911046
                      ],
                      [
                          21.933886,
                          -12.898437
                      ],
                      [
                          21.887843,
                          -16.08031
                      ],
                      [
                          22.562478,
                          -16.898451
                      ],
                      [
                          23.215048,
                          -17.523116
                      ],
                      [
                          21.377176,
                          -17.930636
                      ],
                      [
                          18.956187,
                          -17.789095
                      ],
                      [
                          18.263309,
                          -17.309951
                      ],
                      [
                          14.209707,
                          -17.353101
                      ],
                      [
                          14.058501,
                          -17.423381
                      ],
                      [
                          13.462362,
                          -16.971212
                      ],
                      [
                          12.814081,
                          -16.941343
                      ],
                      [
                          12.215461,
                          -17.111668
                      ],
                      [
                          11.734199,
                          -17.301889
                      ],
                      [
                          11.640096,
                          -16.673142
                      ],
                      [
                          11.778537,
                          -15.793816
                      ],
                      [
                          12.123581,
                          -14.878316
                      ],
                      [
                          12.175619,
                          -14.449144
                      ],
                      [
                          12.500095,
                          -13.5477
                      ],
                      [
                          12.738479,
                          -13.137906
                      ],
                      [
                          13.312914,
                          -12.48363
                      ],
                      [
                          13.633721,
                          -12.038645
                      ],
                      [
                          13.738728,
                          -11.297863
                      ],
                      [
                          13.686379,
                          -10.731076
                      ],
                      [
                          13.387328,
                          -10.373578
                      ],
                      [
                          13.120988,
                          -9.766897
                      ],
                      [
                          12.87537,
                          -9.166934
                      ],
                      [
                          12.929061,
                          -8.959091
                      ],
                      [
                          13.236433,
                          -8.562629
                      ],
                      [
                          12.93304,
                          -7.596539
                      ],
                      [
                          12.728298,
                          -6.927122
                      ],
                      [
                          12.227347,
                          -6.294448
                      ],
                      [
                          12.322432,
                          -6.100092
                      ],
                      [
                          12.735171,
                          -5.965682
                      ],
                      [
                          13.024869,
                          -5.984389
                      ],
                      [
                          13.375597,
                          -5.864241
                      ],
                      [
                          16.326528,
                          -5.87747
                      ],
                      [
                          16.57318,
                          -6.622645
                      ],
                      [
                          16.860191,
                          -7.222298
                      ],
                      [
                          17.089996,
                          -7.545689
                      ],
                      [
                          17.47297,
                          -8.068551
                      ],
                      [
                          18.134222,
                          -7.987678
                      ],
                      [
                          18.464176,
                          -7.847014
                      ],
                      [
                          19.016752,
                          -7.988246
                      ],
                      [
                          19.166613,
                          -7.738184
                      ],
                      [
                          19.417502,
                          -7.155429
                      ],
                      [
                          20.037723,
                          -7.116361
                      ],
                      [
                          20.091622,
                          -6.94309
                      ],
                      [
                          20.601823,
                          -6.939318
                      ],
                      [
                          20.514748,
                          -7.299606
                      ],
                      [
                          21.728111,
                          -7.290872
                      ],
                      [
                          21.746456,
                          -7.920085
                      ],
                      [
                          21.949131,
                          -8.305901
                      ],
                      [
                          21.801801,
                          -8.908707
                      ],
                      [
                          21.875182,
                          -9.523708
                      ],
                      [
                          22.208753,
                          -9.894796
                      ],
                      [
                          22.155268,
                          -11.084801
                      ],
                      [
                          22.402798,
                          -10.993075
                      ],
                      [
                          22.837345,
                          -11.017622
                      ],
                      [
                          23.456791,
                          -10.867863
                      ],
                      [
                          23.912215,
                          -10.926826
                      ],
                      [
                          24.017894,
                          -11.237298
                      ],
                      [
                          23.904154,
                          -11.722282
                      ]
                  ]
              ],
              [
                  [
                      [
                          12.182337,
                          -5.789931
                      ],
                      [
                          11.914963,
                          -5.037987
                      ],
                      [
                          12.318608,
                          -4.60623
                      ],
                      [
                          12.62076,
                          -4.438023
                      ],
                      [
                          12.995517,
                          -4.781103
                      ],
                      [
                          12.631612,
                          -4.991271
                      ],
                      [
                          12.468004,
                          -5.248362
                      ],
                      [
                          12.436688,
                          -5.684304
                      ],
                      [
                          12.182337,
                          -5.789931
                      ]
                  ]
              ]
          ]
      }
  },
  {
      "type": "Feature",
      "properties": {
          "scalerank": 1,
          "featurecla": "Admin-0 country",
          "LABELRANK": 6,
          "SOVEREIGNT": "Albania",
          "SOV_A3": "ALB",
          "ADM0_DIF": 0,
          "LEVEL": 2,
          "TYPE": "Sovereign country",
          "ADMIN": "Albania",
          "ADM0_A3": "ALB",
          "GEOU_DIF": 0,
          "GEOUNIT": "Albania",
          "GU_A3": "ALB",
          "SU_DIF": 0,
          "SUBUNIT": "Albania",
          "SU_A3": "ALB",
          "BRK_DIFF": 0,
          "NAME": "Albania",
          "NAME_LONG": "Albania",
          "BRK_A3": "ALB",
          "BRK_NAME": "Albania",
          "BRK_GROUP": null,
          "ABBREV": "Alb.",
          "POSTAL": "AL",
          "FORMAL_EN": "Republic of Albania",
          "FORMAL_FR": null,
          "NAME_CIAWF": "Albania",
          "NOTE_ADM0": null,
          "NOTE_BRK": null,
          "NAME_SORT": "Albania",
          "NAME_ALT": null,
          "MAPCOLOR7": 1,
          "MAPCOLOR8": 4,
          "MAPCOLOR9": 1,
          "MAPCOLOR13": 6,
          "POP_EST": 3047987,
          "POP_RANK": 12,
          "GDP_MD_EST": 33900,
          "POP_YEAR": 2017,
          "LASTCENSUS": 2001,
          "GDP_YEAR": 2016,
          "ECONOMY": "6. Developing region",
          "INCOME_GRP": "4. Lower middle income",
          "WIKIPEDIA": -99,
          "FIPS_10_": "AL",
          "ISO_A2": "AL",
          "ISO_A3": "ALB",
          "ISO_A3_EH": "ALB",
          "ISO_N3": "008",
          "UN_A3": "008",
          "WB_A2": "AL",
          "WB_A3": "ALB",
          "WOE_ID": 23424742,
          "WOE_ID_EH": 23424742,
          "WOE_NOTE": "Exact WOE match as country",
          "ADM0_A3_IS": "ALB",
          "ADM0_A3_US": "ALB",
          "ADM0_A3_UN": -99,
          "ADM0_A3_WB": -99,
          "CONTINENT": "Europe",
          "REGION_UN": "Europe",
          "SUBREGION": "Southern Europe",
          "REGION_WB": "Europe & Central Asia",
          "NAME_LEN": 7,
          "LONG_LEN": 7,
          "ABBREV_LEN": 4,
          "TINY": -99,
          "HOMEPART": 1,
          "MIN_ZOOM": 0,
          "MIN_LABEL": 5,
          "MAX_LABEL": 10
      },
      "bbox": [
          19.304486,
          39.624998,
          21.02004,
          42.688247
      ],
      "geometry": {
          "type": "Polygon",
          "coordinates": [
              [
                  [
                      21.02004,
                      40.842727
                  ],
                  [
                      20.99999,
                      40.580004
                  ],
                  [
                      20.674997,
                      40.435
                  ],
                  [
                      20.615,
                      40.110007
                  ],
                  [
                      20.150016,
                      39.624998
                  ],
                  [
                      19.98,
                      39.694993
                  ],
                  [
                      19.960002,
                      39.915006
                  ],
                  [
                      19.406082,
                      40.250773
                  ],
                  [
                      19.319059,
                      40.72723
                  ],
                  [
                      19.40355,
                      41.409566
                  ],
                  [
                      19.540027,
                      41.719986
                  ],
                  [
                      19.371769,
                      41.877548
                  ],
                  [
                      19.371768,
                      41.877551
                  ],
                  [
                      19.304486,
                      42.195745
                  ],
                  [
                      19.738051,
                      42.688247
                  ],
                  [
                      19.801613,
                      42.500093
                  ],
                  [
                      20.0707,
                      42.58863
                  ],
                  [
                      20.283755,
                      42.32026
                  ],
                  [
                      20.52295,
                      42.21787
                  ],
                  [
                      20.590247,
                      41.855409
                  ],
                  [
                      20.590247,
                      41.855404
                  ],
                  [
                      20.463175,
                      41.515089
                  ],
                  [
                      20.605182,
                      41.086226
                  ],
                  [
                      21.02004,
                      40.842727
                  ]
              ]
          ]
      }
  },
  {
      "type": "Feature",
      "properties": {
          "scalerank": 1,
          "featurecla": "Admin-0 country",
          "LABELRANK": 4,
          "SOVEREIGNT": "United Arab Emirates",
          "SOV_A3": "ARE",
          "ADM0_DIF": 0,
          "LEVEL": 2,
          "TYPE": "Sovereign country",
          "ADMIN": "United Arab Emirates",
          "ADM0_A3": "ARE",
          "GEOU_DIF": 0,
          "GEOUNIT": "United Arab Emirates",
          "GU_A3": "ARE",
          "SU_DIF": 0,
          "SUBUNIT": "United Arab Emirates",
          "SU_A3": "ARE",
          "BRK_DIFF": 0,
          "NAME": "United Arab Emirates",
          "NAME_LONG": "United Arab Emirates",
          "BRK_A3": "ARE",
          "BRK_NAME": "United Arab Emirates",
          "BRK_GROUP": null,
          "ABBREV": "U.A.E.",
          "POSTAL": "AE",
          "FORMAL_EN": "United Arab Emirates",
          "FORMAL_FR": null,
          "NAME_CIAWF": "United Arab Emirates",
          "NOTE_ADM0": null,
          "NOTE_BRK": null,
          "NAME_SORT": "United Arab Emirates",
          "NAME_ALT": null,
          "MAPCOLOR7": 2,
          "MAPCOLOR8": 1,
          "MAPCOLOR9": 3,
          "MAPCOLOR13": 3,
          "POP_EST": 6072475,
          "POP_RANK": 13,
          "GDP_MD_EST": 667200,
          "POP_YEAR": 2017,
          "LASTCENSUS": 2010,
          "GDP_YEAR": 2016,
          "ECONOMY": "6. Developing region",
          "INCOME_GRP": "2. High income: nonOECD",
          "WIKIPEDIA": -99,
          "FIPS_10_": "AE",
          "ISO_A2": "AE",
          "ISO_A3": "ARE",
          "ISO_A3_EH": "ARE",
          "ISO_N3": "784",
          "UN_A3": "784",
          "WB_A2": "AE",
          "WB_A3": "ARE",
          "WOE_ID": 23424738,
          "WOE_ID_EH": 23424738,
          "WOE_NOTE": "Exact WOE match as country",
          "ADM0_A3_IS": "ARE",
          "ADM0_A3_US": "ARE",
          "ADM0_A3_UN": -99,
          "ADM0_A3_WB": -99,
          "CONTINENT": "Asia",
          "REGION_UN": "Asia",
          "SUBREGION": "Western Asia",
          "REGION_WB": "Middle East & North Africa",
          "NAME_LEN": 20,
          "LONG_LEN": 20,
          "ABBREV_LEN": 6,
          "TINY": -99,
          "HOMEPART": 1,
          "MIN_ZOOM": 0,
          "MIN_LABEL": 4,
          "MAX_LABEL": 9
      },
      "bbox": [
          51.579519,
          22.496948,
          56.396847,
          26.055464
      ],
      "geometry": {
          "type": "Polygon",
          "coordinates": [
              [
                  [
                      51.579519,
                      24.245497
                  ],
                  [
                      51.757441,
                      24.294073
                  ],
                  [
                      51.794389,
                      24.019826
                  ],
                  [
                      52.577081,
                      24.177439
                  ],
                  [
                      53.404007,
                      24.151317
                  ],
                  [
                      54.008001,
                      24.121758
                  ],
                  [
                      54.693024,
                      24.797892
                  ],
                  [
                      55.439025,
                      25.439145
                  ],
                  [
                      56.070821,
                      26.055464
                  ],
                  [
                      56.261042,
                      25.714606
                  ],
                  [
                      56.396847,
                      24.924732
                  ],
                  [
                      55.886233,
                      24.920831
                  ],
                  [
                      55.804119,
                      24.269604
                  ],
                  [
                      55.981214,
                      24.130543
                  ],
                  [
                      55.528632,
                      23.933604
                  ],
                  [
                      55.525841,
                      23.524869
                  ],
                  [
                      55.234489,
                      23.110993
                  ],
                  [
                      55.208341,
                      22.70833
                  ],
                  [
                      55.006803,
                      22.496948
                  ],
                  [
                      52.000733,
                      23.001154
                  ],
                  [
                      51.617708,
                      24.014219
                  ],
                  [
                      51.579519,
                      24.245497
                  ]
              ]
          ]
      }
  },
  {
      "type": "Feature",
      "properties": {
          "scalerank": 1,
          "featurecla": "Admin-0 country",
          "LABELRANK": 2,
          "SOVEREIGNT": "Argentina",
          "SOV_A3": "ARG",
          "ADM0_DIF": 0,
          "LEVEL": 2,
          "TYPE": "Sovereign country",
          "ADMIN": "Argentina",
          "ADM0_A3": "ARG",
          "GEOU_DIF": 0,
          "GEOUNIT": "Argentina",
          "GU_A3": "ARG",
          "SU_DIF": 0,
          "SUBUNIT": "Argentina",
          "SU_A3": "ARG",
          "BRK_DIFF": 0,
          "NAME": "Argentina",
          "NAME_LONG": "Argentina",
          "BRK_A3": "ARG",
          "BRK_NAME": "Argentina",
          "BRK_GROUP": null,
          "ABBREV": "Arg.",
          "POSTAL": "AR",
          "FORMAL_EN": "Argentine Republic",
          "FORMAL_FR": null,
          "NAME_CIAWF": "Argentina",
          "NOTE_ADM0": null,
          "NOTE_BRK": null,
          "NAME_SORT": "Argentina",
          "NAME_ALT": null,
          "MAPCOLOR7": 3,
          "MAPCOLOR8": 1,
          "MAPCOLOR9": 3,
          "MAPCOLOR13": 13,
          "POP_EST": 44293293,
          "POP_RANK": 15,
          "GDP_MD_EST": 879400,
          "POP_YEAR": 2017,
          "LASTCENSUS": 2010,
          "GDP_YEAR": 2016,
          "ECONOMY": "5. Emerging region: G20",
          "INCOME_GRP": "3. Upper middle income",
          "WIKIPEDIA": -99,
          "FIPS_10_": "AR",
          "ISO_A2": "AR",
          "ISO_A3": "ARG",
          "ISO_A3_EH": "ARG",
          "ISO_N3": "032",
          "UN_A3": "032",
          "WB_A2": "AR",
          "WB_A3": "ARG",
          "WOE_ID": 23424747,
          "WOE_ID_EH": 23424747,
          "WOE_NOTE": "Exact WOE match as country",
          "ADM0_A3_IS": "ARG",
          "ADM0_A3_US": "ARG",
          "ADM0_A3_UN": -99,
          "ADM0_A3_WB": -99,
          "CONTINENT": "South America",
          "REGION_UN": "Americas",
          "SUBREGION": "South America",
          "REGION_WB": "Latin America & Caribbean",
          "NAME_LEN": 9,
          "LONG_LEN": 9,
          "ABBREV_LEN": 4,
          "TINY": -99,
          "HOMEPART": 1,
          "MIN_ZOOM": 0,
          "MIN_LABEL": 2,
          "MAX_LABEL": 7
      },
      "bbox": [
          -73.415436,
          -55.25,
          -53.628349,
          -21.83231
      ],
      "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
              [
                  [
                      [
                          -66.95992,
                          -54.89681
                      ],
                      [
                          -67.56244,
                          -54.87001
                      ],
                      [
                          -68.63335,
                          -54.8695
                      ],
                      [
                          -68.63401,
                          -52.63637
                      ],
                      [
                          -68.25,
                          -53.1
                      ],
                      [
                          -67.75,
                          -53.85
                      ],
                      [
                          -66.45,
                          -54.45
                      ],
                      [
                          -65.05,
                          -54.7
                      ],
                      [
                          -65.5,
                          -55.2
                      ],
                      [
                          -66.45,
                          -55.25
                      ],
                      [
                          -66.95992,
                          -54.89681
                      ]
                  ]
              ],
              [
                  [
                      [
                          -68.571545,
                          -52.299444
                      ],
                      [
                          -69.498362,
                          -52.142761
                      ],
                      [
                          -71.914804,
                          -52.009022
                      ],
                      [
                          -72.329404,
                          -51.425956
                      ],
                      [
                          -72.309974,
                          -50.67701
                      ],
                      [
                          -72.975747,
                          -50.74145
                      ],
                      [
                          -73.328051,
                          -50.378785
                      ],
                      [
                          -73.415436,
                          -49.318436
                      ],
                      [
                          -72.648247,
                          -48.878618
                      ],
                      [
                          -72.331161,
                          -48.244238
                      ],
                      [
                          -72.447355,
                          -47.738533
                      ],
                      [
                          -71.917258,
                          -46.884838
                      ],
                      [
                          -71.552009,
                          -45.560733
                      ],
                      [
                          -71.659316,
                          -44.973689
                      ],
                      [
                          -71.222779,
                          -44.784243
                      ],
                      [
                          -71.329801,
                          -44.407522
                      ],
                      [
                          -71.793623,
                          -44.207172
                      ],
                      [
                          -71.464056,
                          -43.787611
                      ],
                      [
                          -71.915424,
                          -43.408565
                      ],
                      [
                          -72.148898,
                          -42.254888
                      ],
                      [
                          -71.746804,
                          -42.051386
                      ],
                      [
                          -71.915734,
                          -40.832339
                      ],
                      [
                          -71.680761,
                          -39.808164
                      ],
                      [
                          -71.413517,
                          -38.916022
                      ],
                      [
                          -70.814664,
                          -38.552995
                      ],
                      [
                          -71.118625,
                          -37.576827
                      ],
                      [
                          -71.121881,
                          -36.658124
                      ],
                      [
                          -70.364769,
                          -36.005089
                      ],
                      [
                          -70.388049,
                          -35.169688
                      ],
                      [
                          -69.817309,
                          -34.193571
                      ],
                      [
                          -69.814777,
                          -33.273886
                      ],
                      [
                          -70.074399,
                          -33.09121
                      ],
                      [
                          -70.535069,
                          -31.36501
                      ],
                      [
                          -69.919008,
                          -30.336339
                      ],
                      [
                          -70.01355,
                          -29.367923
                      ],
                      [
                          -69.65613,
                          -28.459141
                      ],
                      [
                          -69.001235,
                          -27.521214
                      ],
                      [
                          -68.295542,
                          -26.89934
                      ],
                      [
                          -68.5948,
                          -26.506909
                      ],
                      [
                          -68.386001,
                          -26.185016
                      ],
                      [
                          -68.417653,
                          -24.518555
                      ],
                      [
                          -67.328443,
                          -24.025303
                      ],
                      [
                          -66.985234,
                          -22.986349
                      ],
                      [
                          -67.106674,
                          -22.735925
                      ],
                      [
                          -66.273339,
                          -21.83231
                      ],
                      [
                          -64.964892,
                          -22.075862
                      ],
                      [
                          -64.377021,
                          -22.798091
                      ],
                      [
                          -63.986838,
                          -21.993644
                      ],
                      [
                          -62.846468,
                          -22.034985
                      ],
                      [
                          -62.685057,
                          -22.249029
                      ],
                      [
                          -60.846565,
                          -23.880713
                      ],
                      [
                          -60.028966,
                          -24.032796
                      ],
                      [
                          -58.807128,
                          -24.771459
                      ],
                      [
                          -57.777217,
                          -25.16234
                      ],
                      [
                          -57.63366,
                          -25.603657
                      ],
                      [
                          -58.618174,
                          -27.123719
                      ],
                      [
                          -57.60976,
                          -27.395899
                      ],
                      [
                          -56.486702,
                          -27.548499
                      ],
                      [
                          -55.695846,
                          -27.387837
                      ],
                      [
                          -54.788795,
                          -26.621786
                      ],
                      [
                          -54.625291,
                          -25.739255
                      ],
                      [
                          -54.13005,
                          -25.547639
                      ],
                      [
                          -53.628349,
                          -26.124865
                      ],
                      [
                          -53.648735,
                          -26.923473
                      ],
                      [
                          -54.490725,
                          -27.474757
                      ],
                      [
                          -55.162286,
                          -27.881915
                      ],
                      [
                          -56.2909,
                          -28.852761
                      ],
                      [
                          -57.625133,
                          -30.216295
                      ],
                      [
                          -57.874937,
                          -31.016556
                      ],
                      [
                          -58.14244,
                          -32.044504
                      ],
                      [
                          -58.132648,
                          -33.040567
                      ],
                      [
                          -58.349611,
                          -33.263189
                      ],
                      [
                          -58.427074,
                          -33.909454
                      ],
                      [
                          -58.495442,
                          -34.43149
                      ],
                      [
                          -57.22583,
                          -35.288027
                      ],
                      [
                          -57.362359,
                          -35.97739
                      ],
                      [
                          -56.737487,
                          -36.413126
                      ],
                      [
                          -56.788285,
                          -36.901572
                      ],
                      [
                          -57.749157,
                          -38.183871
                      ],
                      [
                          -59.231857,
                          -38.72022
                      ],
                      [
                          -61.237445,
                          -38.928425
                      ],
                      [
                          -62.335957,
                          -38.827707
                      ],
                      [
                          -62.125763,
                          -39.424105
                      ],
                      [
                          -62.330531,
                          -40.172586
                      ],
                      [
                          -62.145994,
                          -40.676897
                      ],
                      [
                          -62.745803,
                          -41.028761
                      ],
                      [
                          -63.770495,
                          -41.166789
                      ],
                      [
                          -64.73209,
                          -40.802677
                      ],
                      [
                          -65.118035,
                          -41.064315
                      ],
                      [
                          -64.978561,
                          -42.058001
                      ],
                      [
                          -64.303408,
                          -42.359016
                      ],
                      [
                          -63.755948,
                          -42.043687
                      ],
                      [
                          -63.458059,
                          -42.563138
                      ],
                      [
                          -64.378804,
                          -42.873558
                      ],
                      [
                          -65.181804,
                          -43.495381
                      ],
                      [
                          -65.328823,
                          -44.501366
                      ],
                      [
                          -65.565269,
                          -45.036786
                      ],
                      [
                          -66.509966,
                          -45.039628
                      ],
                      [
                          -67.293794,
                          -45.551896
                      ],
                      [
                          -67.580546,
                          -46.301773
                      ],
                      [
                          -66.597066,
                          -47.033925
                      ],
                      [
                          -65.641027,
                          -47.236135
                      ],
                      [
                          -65.985088,
                          -48.133289
                      ],
                      [
                          -67.166179,
                          -48.697337
                      ],
                      [
                          -67.816088,
                          -49.869669
                      ],
                      [
                          -68.728745,
                          -50.264218
                      ],
                      [
                          -69.138539,
                          -50.73251
                      ],
                      [
                          -68.815561,
                          -51.771104
                      ],
                      [
                          -68.149995,
                          -52.349983
                      ],
                      [
                          -68.571545,
                          -52.299444
                      ]
                  ]
              ]
          ]
      }
  }
]