<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Lang = { code: string; label: string; flag: string }

const langs: Lang[] = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
  { code: 'fr', label: 'French', flag: 'https://flagcdn.com/w20/fr.png' },
  { code: 'es', label: 'Spanish', flag: 'https://flagcdn.com/w20/es.png' },
  { code: 'de', label: 'German', flag: 'https://flagcdn.com/w20/de.png' },
  { code: 'pt', label: 'Portuguese', flag: 'https://flagcdn.com/w20/pt.png' },
  { code: 'ar', label: 'Arabic', flag: 'https://flagcdn.com/w20/sa.png' },
  { code: 'zh-CN', label: 'Chinese (Simplified)', flag: 'https://flagcdn.com/w20/cn.png' },
  { code: 'hi', label: 'Hindi', flag: 'https://flagcdn.com/w20/in.png' },
]

const current = ref<Lang>(langs[0] as Lang) // default EN

// --- Google Translate setup ---
onMounted(() => {
  // Load Google Translate script once
  if (!document.querySelector('#google-translate-script')) {
    const s = document.createElement('script')
    s.id = 'google-translate-script'
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    document.body.appendChild(s)
  }

  // Define init globally
  ;(window as any).googleTranslateElementInit = () => {
    new (window as any).google.translate.TranslateElement(
      { pageLanguage: 'en' },
      'google_translate_element'
    )
  }

  // Restore saved language if exists
  const saved = localStorage.getItem('selectedLang')
  if (saved) {
    // slight delay to ensure widget loads
    setTimeout(() => {
      doGTranslate(saved)
    }, 600)
  }
})

// --- Translate + persist ---
function doGTranslate(lang: string) {
  const select: HTMLSelectElement | null = document.querySelector(
    'select.goog-te-combo'
  )
  if (select) {
    select.value = lang
    select.dispatchEvent(new Event('change'))
    localStorage.setItem('selectedLang', lang)
  }
  const found = langs.find(l => l.code === lang)
  if (found) current.value = found
}
</script>

<template>
  <div>
    <!-- hidden Google Translate widget -->
    <div id="google_translate_element" class="d-none"></div>

    <!-- Bootstrap 5 Dropdown -->
    <div class="dropdown">
      <button
        class="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          :src="current.flag"
          :alt="current.label"
          style="width: 20px; height: 14px"
        />
        {{ current.label }}
      </button>
      <ul class="translate-select dropdown-menu shadow">
        <li v-for="lang in langs" :key="lang.code">
          <a
            href="#"
            class="dropdown-item d-flex align-items-center gap-2"
            @click.prevent="doGTranslate(lang.code)"
          >
            <img
              :src="lang.flag"
              :alt="lang.label"
              style="width: 20px; height: 14px"
            />
            {{ lang.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.translate-select {
	position: fixed!important;
	top: 10px;
	right: 10px;
	left: auto;
}
</style>