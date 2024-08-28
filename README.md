## Getting Started

Make sure you have nodejs v2.

First install dependencies:

```bash
npm install
```

to run the development server:

```bash
npm run dev
```

to run tests;

```bash
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### deployment

You can find the deployed version at (you may need vpn) [https://percentage-order.vercel.app/](https://percentage-order.vercel.app/)

deployment in done automatically once there is a new commit on main

## Choices

* I decided to implement this project using NextJs app router. Although it is not quite production ready yet (in my opinion) I believe it to be extremely powerful framework and it to be the future of react (for non SPA apps).
* since there was no emphasis on ui for this task I decided to use Material ui. this was my first time using mui. and I used sass modules for styling. in hindsight mui works very well with styled component or any other css in js solution since all the variables are inside js.
* for the percentage input I was not sure if I should calculate the result only for the 10 items shown or the whole order list. I decided to do in for the shown list but I believe the principle is the same
* I used husky and lint-staged for precommit, so that no checked code would be added to git

## improvements

* it would be good to add `Storybook`.
* it would be better to use font compatible with persian language and also changes all the numbers to persian numbers.
* add running tests to ci/cd before deploying
