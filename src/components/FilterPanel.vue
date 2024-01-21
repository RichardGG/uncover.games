<template>
    <div>
        TODO
    </div>
</template>
  
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    name: 'FilterPanel',
    components: { },
    props: {
      fileName: String
    },
    setup (props) {
      const filters = [
        {
            label: 'Installed',
            value: 'IsInstalled',
            type: 'Boolean',
        },
        {
            label: 'Not installed',
            value: 'IsUnInstalled',
            type: 'Boolean',
        },
        {
            label: 'Hidden',
            value: 'Hidden',
            type: 'Boolean',
        },
        {
            label: 'Favorite',
            value: 'Favorite',
            type: 'Boolean',
        },
        {
            label: 'Match all filters', // WOW it does support and
            value: 'UseAndFilteringStyle', // WOW it does support and
            type: 'Boolean',
        },
        {
            label: 'Platform',
            value: 'Platform',
            type: 'Array',
        },
        {
            label: 'Library',
            value: 'Library',
            type: 'Array',
        },
        {
            label: 'Name',
            value: 'Name',
            type: 'Array',
        },
        {
            label: 'Genre',
            value: 'Genre',
            type: 'Array',
        },
        {
            label: 'Release Year',
            value: 'ReleaseYear',
            type: 'Date',
        },
        {
            label: 'Developer',
            value: 'Developer',
            type: 'Array',
        },
        {
            label: 'Publisher',
            value: 'Publisher',
            type: 'Array',
        },
        {
            label: 'Category',
            value: 'Category',
            type: 'Array',
        },
        {
            label: 'Tag',
            value: 'Tag',
            type: 'Array',
        },
        {
            label: 'Feature',
            value: 'Feature',
            type: 'Array',
        },
        {
            label: 'Time Played',
            value: 'PlayTime',
            type: 'Time',
        },
        {
            label: 'Install Size',
            value: 'InstallSize',
            type: 'Integer',
        },
        {
            label: 'Completion Status',
            value: 'CompletionStatus',
            type: Array,
        },
        {
            label: 'Series',
            value: 'Series',
            type: Array,
        },
        {
            label: 'Added',
            value: 'Added',
            type: 'Array',
        },
        {
            label: 'AgeRating',
            value: 'AgeRating',
            type: 'Array',
        },
        {
            label: 'CommunityScore',
            value: 'CommunityScore',
            type: 'Array',
        },
        {
            label: 'CriticScore',
            value: 'CriticScore',
            type: 'Array',
        },
        {
            label: 'LastActivity',
            value: 'LastActivity',
            type: 'Array',
        },
        {
            label: 'Modified',
            value: 'Modified',
            type: 'Array',
        },
        {
            label: 'RecentActivity',
            value: 'RecentActivity',
            type: 'Array',
        },
        {
            label: 'Region',
            value: 'Region',
            type: 'Array',
        },
        {
            label: 'Source',
            value: 'Source',
            type: 'Array',
        },
        {
            label: 'UserScore',
            value: 'UserScore',
            type: 'Array',
        },
        {
            label: 'Version',
            value: 'Version',
            type: 'Array',
        },
      ]
    }
  })
</script>