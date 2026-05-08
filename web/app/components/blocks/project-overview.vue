<script setup lang="ts">
import type { ProjectOverview } from '#shared/types/sanity'
import type { BlockMeta, ProjectOverviewItem } from '~/types/blocks'

const props = defineProps<
  Omit<ProjectOverview, 'projects'> &
    BlockMeta & { projects: ProjectOverviewItem[] }
>()

const hoveredProject = ref<ProjectOverviewItem | null>(null)
const hasHover = useMediaQuery('(hover: hover)')

const projectList = computed<ProjectOverviewItem[]>(
  () => props.projects?.filter(Boolean) ?? [],
)

const cursorX = useMotionValue(-400)
const cursorY = useMotionValue(-400)
const springConfig = { stiffness: 280, damping: 22, mass: 0.4 }
const x = useSpring(cursorX, springConfig)
const y = useSpring(cursorY, springConfig)
const rotateRaw = useMotionValue(0)
const rotate = useSpring(rotateRaw, { stiffness: 180, damping: 18, mass: 0.5 })

let prevClientX = 0
let stopTimer: ReturnType<typeof setTimeout> | null = null

function onMouseMove(e: MouseEvent) {
  const delta = e.clientX - prevClientX
  prevClientX = e.clientX

  cursorX.set(e.clientX)
  cursorY.set(e.clientY)

  rotateRaw.set(Math.max(-14, Math.min(14, delta * 0.9)))

  if (stopTimer) clearTimeout(stopTimer)
  stopTimer = setTimeout(() => rotateRaw.set(0), 80)
}
</script>

<template>
  <section
    id="work"
    class="content-container py-24 md:py-32"
    @mousemove="onMouseMove"
  >
    <div
      class="mb-8 md:mb-16 flex items-baseline justify-between border-b pb-7"
    >
      <h2>{{ title }}</h2>
      <p class="meta">{{ projectList.length }} {{ $t('projects') }}</p>
    </div>

    <div>
      <div
        v-for="(project, i) in projectList"
        :key="project._id"
        class="group relative grid md:grid-cols-[60px_1fr_220px_60px] items-center gap-1 md:gap-8 border-b py-3.5 md:py-7 transition-colors"
        @mouseenter="hoveredProject = project"
        @mouseleave="hoveredProject = null"
      >
        <span class="meta tracking-widest">{{ generateIndex(i) }}</span>

        <span
          class="font-serif text-[32px] font-normal tracking-tight text-foreground group-hover:italic transition-[font-style]"
        >
          {{ project.title }}
        </span>

        <span class="hidden md:block text-sm text-muted-foreground">
          {{ project.description }}
        </span>

        <SanityLink
          v-bind="project.link"
          class="hidden md:block text-muted-foreground group-hover:text-primary transition-colors after:absolute after:inset-0"
        >
          <Icon name="tabler:external-link" />
        </SanityLink>

        <div class="flex md:hidden gap-4">
          <span class="text-sm text-muted-foreground">
            {{ project.description }}
          </span>

          <SanityLink
            v-bind="project.link"
            class="text-muted-foreground group-hover:text-primary transition-colors after:absolute after:inset-0"
          >
            <Icon name="tabler:external-link" />
          </SanityLink>
        </div>
      </div>
    </div>

    <Teleport v-if="hasHover" to="body">
      <Motion
        tag="div"
        :style="{ x, y, rotate, translateX: '-50%', translateY: '-125%' }"
        :animate="{
          opacity: hoveredProject ? 1 : 0,
          scale: hoveredProject ? 1 : 0.82,
        }"
        :transition="{ duration: 0.18, ease: 'easeOut' }"
        class="pointer-events-none fixed top-0 left-0 z-50 w-60 h-40 overflow-hidden rounded-xl shadow-2xl"
      >
        <SanityImage
          v-if="hoveredProject?.thumbnail?.assetRef"
          :asset-id="hoveredProject.thumbnail.assetRef"
          :alt="hoveredProject.thumbnail.altText"
          :w="240"
          :h="160"
          fit="crop"
          auto="format"
          preload
          class="w-full h-full object-cover"
        />
      </Motion>
    </Teleport>
  </section>
</template>
