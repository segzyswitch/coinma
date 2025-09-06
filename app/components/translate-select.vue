<script setup lang="ts">
const { applyLanguage, currentLanguage } = useGoogleTranslate();

const languages = [
  { code: "en", label: "English", flag: "https://flagcdn.com/w20/gb.png" },
  { code: "fr", label: "Français", flag: "https://flagcdn.com/w20/fr.png" },
  { code: "es", label: "Español", flag: "https://flagcdn.com/w20/es.png" },
  { code: "de", label: "Deutsch", flag: "https://flagcdn.com/w20/de.png" },
  { code: "it", label: "Italiano", flag: "https://flagcdn.com/w20/it.png" },
  { code: "pt", label: "Português", flag: "https://flagcdn.com/w20/pt.png" },
  { code: "ar", label: "العربية", flag: "https://flagcdn.com/w20/sa.png" },
  { code: "hi", label: "हिन्दी", flag: "https://flagcdn.com/w20/in.png" },
  { code: "zh-CN", label: "简体中文", flag: "https://flagcdn.com/w20/cn.png" },
  { code: "ja", label: "日本語", flag: "https://flagcdn.com/w20/jp.png" },
  { code: "ru", label: "Русский", flag: "https://flagcdn.com/w20/ru.png" },
];

const open = ref(false);
const lang = ref("en");

onMounted(() => {
  lang.value = currentLanguage();
});

const selected:any = computed(
  () => languages.find((l) => l.code === lang.value) || languages[0]
);

const select = (l: any) => {
  lang.value = l.code;
  applyLanguage(l.code);
  open.value = false;
};
</script>

<template>
  <div class="translator">
    <!-- Selected language button -->
    <button class="btn translator__button bg-dark-mid text-mid mt-1" @click="open = !open">
      <img :src="selected.flag" :alt="selected.label" class="translator__flag" />
      <span>{{ selected.label }}</span>
      <i class="bi bi-caret-down-fill ms-2" :style="{ transform: open ? 'rotateZ(180deg)' : 'none' }"></i>
    </button>

    <!-- Dropdown -->
    <ul v-if="open" class="translator__menu bg-dark text-mid">
      <li
        v-for="l in languages"
        :key="l.code"
        class="translator__item"
        @click="select(l)"
      >
        <img :src="l.flag" :alt="l.label" class="translator__flag" />
        <span>{{ l.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.translator {
  position: relative;
  display: inline-block;
}
.translator__button {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .5rem .75rem;
  border-radius: .5rem;
  cursor: pointer;
}
.translator__menu {
  position: absolute;
  top: 110%;
  left: 0;
  border-radius: .5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
  list-style: none;
  padding: .25rem 0;
  margin: 0;
  z-index: 50;
}
.translator__item {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .4rem .75rem;
  cursor: pointer;
}
/* .translator__item:hover {
  background: #f3f4f6;
} */
.translator__flag {
  width: 20px;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
}
</style>
