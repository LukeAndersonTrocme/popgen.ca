import { useState, useEffect } from 'react';

const ADS = [
  // Academic parody
  {
    headline: "You Won't BELIEVE This P-Value",
    body: 'Scientists HATE this one weird statistical trick.',
    cta: 'p < 0.001 !!!',
    style: 'parody',
  },
  {
    headline: 'Download More RAM',
    body: 'Your GWAS needs it. 100% free. No virus.',
    cta: 'Get 64GB FREE',
    style: 'parody',
  },
  {
    headline: 'Congratulations!!!',
    body: 'Your paper has been ACCEPTED at a journal you have never heard of!',
    cta: 'Pay $3,000 to Publish',
    style: 'parody',
  },
  {
    headline: 'IS YOUR CODE RUNNING TOO SLOW?',
    body: 'Click here to make it run faster!',
    cta: 'OPTIMIZE NOW',
    style: 'parody',
  },
  {
    headline: 'CONGRATULATIONS, DR. RESEARCHER!',
    body: 'You have been selected for a FREE conference in Canc\u00fan!',
    cta: 'Register ($2,500)',
    style: 'parody',
  },
  {
    headline: 'TIRED OF REJECTED MANUSCRIPTS?',
    body: 'Our reviewers say YES to everything!',
    cta: 'Submit Now \u2014 100% Acceptance Rate',
    style: 'parody',
  },
  // Retro internet classics (twisted)
  {
    headline: 'YOU ARE THE 1,000,000th BASE PAIR!',
    body: 'Click here to claim your free genome annotation!',
    cta: 'CLAIM PRIZE',
    style: 'retro',
  },
  {
    headline: 'PUNCH THE ALLELE',
    body: 'Punch the correct allele and win a FREE iPod Nano!',
    cta: '[ A ] [ T ] [ G ] [ C ]',
    style: 'retro',
  },
];

function pickRandom(arr, exclude) {
  const filtered = arr.filter((_, i) => i !== exclude);
  return arr.indexOf(filtered[Math.floor(Math.random() * filtered.length)]);
}

export default function LukezoneAds() {
  const [hidden, setHidden] = useState(false);
  const [leftAd, setLeftAd] = useState(0);
  const [rightAd, setRightAd] = useState(1);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('lz-ads-hidden')) setHidden(true);
    } catch (_) {}

    const left = Math.floor(Math.random() * ADS.length);
    setLeftAd(left);
    setRightAd(pickRandom(ADS, left));
  }, []);

  const dismiss = () => {
    setHidden(true);
    try { sessionStorage.setItem('lz-ads-hidden', '1'); } catch (_) {}
  };

  const restore = () => {
    setHidden(false);
    try { sessionStorage.removeItem('lz-ads-hidden'); } catch (_) {}
    const left = Math.floor(Math.random() * ADS.length);
    setLeftAd(left);
    setRightAd(pickRandom(ADS, left));
  };

  if (hidden) {
    return (
      <button className="lz-ad-restore" onClick={restore}>
        I want my ads back
      </button>
    );
  }

  return (
    <>
      <div className="lz-ad-gutter lz-ad-gutter-left" aria-hidden="true">
        <Ad {...ADS[leftAd]} />
        <button className="lz-ad-dismiss" onClick={dismiss}>
          Go Ad-Free (only $9.99/mo)
        </button>
      </div>
      <div className="lz-ad-gutter lz-ad-gutter-right" aria-hidden="true">
        <Ad {...ADS[rightAd]} />
      </div>
    </>
  );
}

function Ad({ headline, body, cta, style }) {
  return (
    <div className={`lz-ad lz-ad-${style}`}>
      <div className="lz-ad-headline">{headline}</div>
      <div className="lz-ad-body">{body}</div>
      <div className="lz-ad-cta">{cta}</div>
    </div>
  );
}
