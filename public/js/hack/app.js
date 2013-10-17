/*global define */
define([
    'hack/managers/panel_manager',
    'hack/managers/media_manager',
    'hack/views/chapter_panel',
    'hack/views/content_panel'
],
    function (PanelManager, MediaManager, ChapterPanel, ContentPanel) {
        "use strict";
        return {
            PanelManager: PanelManager,
            MediaManager: MediaManager,
            ChapterPanel: ChapterPanel,
            ContentPanel: ContentPanel
        };
    }
);
