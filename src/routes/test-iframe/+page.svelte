<script lang="ts">
  const randomWords = ['newsletter', 'blog', 'website', 'socialmedia', 'email', 'referral', 'campaign'];
  const randomIndex = Math.floor(Math.random() * randomWords.length);
  const randomWord = randomWords[randomIndex];
  const randUrl = `https://u.macula.localhost/36qI3fK2RuqdQ0w7VWZnVw-7/embed/?ref=some-referral-code&utm_source=${randomWord}&utm_medium=web&utm_campaign=spring-sale&utm_content=iframe-test&utm_term=macula`;
</script>

<div class=" flex items-center justify-center gap-4 mb-4 mt-10 flex-col">
  <!-- <iframe
    width="560"
    height="315"
    src="http://localhost:5173/S_dMk9udRV2eZCVW3Jq8xg-7/embed/"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
    picture-in-picture; web-share"
    allowfullscreen
    loading="lazy"
    sandbox="allow-forms allow-modals
    allow-popups allow-presentation allow-same-origin allow-scripts"
    title="a digital illustration
    of a majestic whale"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe> -->

  <!-- <div class=" rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="560"
      height="315"
      src="http://127.0.0.1:3007/36qI3fK2RuqdQ0w7VWZnVw-7/embed/"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      title="She Is Dreaming of a Better Day"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div> -->
  <div class=" rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="560"
      height="315"
      src="https://u.macula.localhost/36qI3fK2RuqdQ0w7VWZnVw-7/embed/?ref=some-referral-code&utm_source=newsletter-woss&utm_medium=website"
      frameborder="0"
      allowfullscreen
      loading="lazy"
      title="She Is Dreaming of a Better Day"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <!-- referrerpolicy we need to have for the full referrer path, without it we only get the host+port -->
  </div>
  <div class=" rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="560"
      height="315"
      src={randUrl}
      frameborder="0"
      allowfullscreen
      loading="lazy"
      title="She Is Dreaming of a Better Day"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <!-- referrerpolicy we need to have for the full referrer path, without it we only get the host+port -->
  </div>
  <!-- <div class=" rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="760"
      height="515"
      src="http://localhost:5173/YG_bytHeQ3-eVwp-BWloHg-0/embed/"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      title="She Is Dreaming of a Better Day"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  <div class=" rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="760"
      height="515"
      src="http://localhost:5173/gIohOpTFTWWmztbNmrBJ9A-0/embed/"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      title="Embedded content"
    ></iframe>
  </div>
  <div class="h-full rounded-xl overflow-hidden hover:shadow-lg">
    <iframe
      width="760"
      height="500"
      src="http://localhost:5173/uWT6Yfq0TRCbwT_9MRzBQA-7/embed/?ref=21dsadaskdasbdasib"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      allowfullscreen
      loading="lazy"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      title="Embedded content"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
  <div class=" rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="760"
      height="515"
      src="http://localhost:5173/MjMfFZ7zQO2vX2rU8FsMwQ-0/embed/"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      referrerpolicy="no-referrer-when-downgrade"
      title="Embedded content"
    ></iframe>
  </div>
  <div class="h-full rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="760"
      height="515"
      src="http://localhost:5173/EzRnNCWOQ4KIIy7qg67XuA-7/embed/?title&description&author&date&image&url"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      title="Embedded content"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  <div class="h-full rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="760"
      height="515"
      src="http://localhost:5173/mgSbP-reSCWk2AZaKFynTQ-0/embed/?title&description&author&date&image&url"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      title="Embedded content"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  <div class=" rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="960"
      height="515"
      src="http://localhost:5173/VAiAgyMfS2mzX9VhV72QRA-7/embed/"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
      allowfullscreen
      loading="lazy"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      title="Embedded content"
    ></iframe>
  </div>
  <div class=" rounded-xl overflow-hidden shadow-lg">
    <iframe
      width="560"
      height="515"
      src="https://www.youtube.com/embed/v_6EXt6T83I"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div> -->
</div>

<div class="mb-40"></div>
