# CTX Context

## wasGeneratedAt

> > ctx1.wasGeneratedAt = *now()* :: **FACT**

**or**

> > ctx1.wasGeneratedAt = *tomorrow()* :: **ASSERTION**

## hasBeginning

> > ctx1.hasBeginning = *oldestFrom*(e(1..n).wasGeneratedAt, a(1..n).wasStartedAt) :: **FACT**

**or**

> > ctx1.hasBeginning = *(now() - random-seconds)* :: **ASSERTION**

## hasEnd

> > ctx1.hasEnd = *youngestFrom*(e(1..n).wasGeneratedAt, a(1..n).wasEndedAt) :: **FACT**

**or**

> > ctx1.hasEnd = *(now() + random-seconds)* :: **ASSERTION**

## Fact

> > (ctx1.hasEnd **before** ctx1.wasGeneratedAt)

## Lie

> > (ctx1.hasEnd **before** ctx1.wasGeneratedAt) :: **ASSERTION**
>
> *and*
>
> > (ctx1.hasEnd **before** *youngestFrom*( ctx1.e(1..n).wasGeneratedAt, ctx1.a(1..n).wasEndedAt) ) :: **FACT**

## Fiction


## Prediction

Prediction, a Narration based on Facts, one or more Activities and at least one Assumption.

> > (ctx1.hasEnd **before** e(n).wasGeneratedAt)

```text
                                        hb                 he     wg     tow
                           |   f(1, 2)   |  f(n)           |      |      |
OverlappedBy(a(n), hb/he)  |             |      <...a(n)...|......|.....>|
Before(he, e(n))           |             |      |          |  ex         e(n,p=87)
```

A Prediction (`p#42`, Activity) has an Expectation, `ex` (before `ctx1.wasGeneradedAt`, `wg`) based on Facts `f(1,2..n)` and ongoing Activity `a(n)`, expressed with given Event `e(n,p=87)` with *estimated* probability of 87 percent, that will happen tomorrow, `tow`.

```json
[
  {
    "@id":                "p#42",
    "@type":              "prov:Activity",
    "prov:startedAtTime": "ex",
    "prov:used":          [
      "ex",
      "a#n",
      "f#1",
      "f#2",
      "f#n"
    ]
  },
  {
    "@id":                  "e#n",
    "@type":                "prov:Entity",
    "prov:generatedAtTime": "tomorrow, tow",
    "prov:wasGeneratedBy":  "p#42",
    "probability":          {
      "@type":  "xst:decimal",
      "@value": "87"
    }
  }
]
```

## Prospective

Some sort of fortune-telling, a very special type of Narration, often used by financial experts.

> > (e(n).wasGeneratedAt **after** ctx1.wasGeneratedAt)
>
> *and*
> 
> > (a(n..m).startedAtTime **after** ctx1.wasGeneratedAt)

```text
                                            hb         he     wg                 ny
                              |   g(1, 2)   |  g(n)    |      |                  |
Before(wg, a(n..m))           |             |          |      |  <...a(n..m)....>|
Before(he, e(n))              |             |          |  as  |                  e(n,p=100)
```

A Prospective (`p#43`, Activity) build on an Assumption, `as` (before `ctx1.wasGeneradedAt`, `wg`) based on Guesses `g(1,2..n)` and future Activities `a(n..m)`, expressed with given Event `e(n,p=100)` with *asserted* probability of 100 percent, that will happen next year, `ny`.

In some special cases an Assumption is done after generating the Context

> > (as.wasGeneratedAt **after** ctx1.wasGeneratedAt)

that is the premier class of Prospectives...

---