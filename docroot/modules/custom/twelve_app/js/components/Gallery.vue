<template>
  <div class="lingalleryContainer">
    <div :style="lingalleryStyle" class="lingallery">
      <large-view
        id="largeView"
        :accent-color="accentColor"
        :item="items[currentIndex]"
        v-if="addons.enableLargeView && showLargeView"
        @close-large-view="showLargeView = false"
      />
      <figure
        :style="figureStyle"
        :class="imageIndex(currentIndex)"
        itemprop="associatedMedia"
        itemscope
        itemtype="http://schema.org/ImageObject"
      >
        <div class="lingallery_spinner">
          <half-circle-spinner
            :animation-duration="1000"
            :color="accentColor"
            :size="60"
            v-if="isLoading"
          />
        </div>
        <picture-element
          v-if="addons.enablePictureElement"
          :alt="currentAlt"
          :is-loading="isLoading"
          :main-image-style="mainImageStyle"
          :items="items"
          :current-index="currentIndex"
          ref="mainImage"
          @handle-large-image-click="handleLargeImageClick"
          @handle-image-swipe="handleImageSwipe"
          @handle-image-loaded="handleImageLoaded"
        />
        <img
          v-else
          :alt="currentAlt"
          :class="{ loading: isLoading }"
          :src="currentImage"
          :style="mainImageStyle"
          @click="handleLargeImageClick"
          @load="handleImageLoaded"
          ref="mainImage"
          v-swipe="handleImageSwipe"
        />
        <div
          :style="captionStyle"
          class="lingallery_caption"
          v-if="currentCaption"
        >
          {{ currentCaption }}
        </div>
        <template v-if="showControls && items.length > 1">
          <a
            @click="showPreviousImage"
            class="control left"
            v-if="!leftControlClass"
          ><span style="position:relative;top:calc(50% - 12px)"
          >&#9664;</span
          ></a
          >
          <a
            @click="showNextImage"
            class="control right"
            v-if="!rightControlClass"
          ><span style="position:relative;top:calc(50% - 12px)"
          >&#9654;</span
          ></a
          >
          <a
            :class="'control left ' + leftControlClass"
            @click="showPreviousImage"
            v-if="leftControlClass"
          ></a>
          <a
            :class="'control right ' + rightControlClass"
            @click="showNextImage"
            v-if="rightControlClass"
          ></a>
        </template>
      </figure>
      <div class="lingallery_thumbnails" v-if="showThumbnails">
        <div class="lingallery_thumbnails_content">
          <div
            :key="index"
            class="lingallery_thumbnails_content_elem"
            v-for="(item, index) in items"
          >
            <div
              :class="thumbnailClass(index)"
              v-on="
                currentIndex !== index
                  ? { click: () => handleImageClick(index) }
                  : {}
              ">
              <img
                :alt="Object.prototype.hasOwnProperty.call(item, 'alt') ? item.alt : ''"
                :src="item.thumbnail"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Lingallery from 'lingallery';

  export default {
    name: 'Gallery',
    extends: Lingallery,
    methods: {
      thumbnailClass(index) {
        return this.currentIndex === index ? 'thumbnail thumbnail-' + index + ' active' : 'thumbnail thumbnail-' + index
      },
      imageIndex(index) {
        return this.currentIndex === 0 ? 'image image-' + index + ' first' : 'image image-' + index
      },
    }
  }
</script>
