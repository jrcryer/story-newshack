/*global define */
define([
    'hack/managers/panel_manager',
    'hack/views/chapter_panel',
    'hack/views/content_panel'
],
    function (PanelManager, ChapterPanel, ContentPanel) {
        "use strict";
        return {
            PanelManager: PanelManager,
            ChapterPanel: ChapterPanel,
            ContentPanel: ContentPanel
        };
    }
);