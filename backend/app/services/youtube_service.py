import html
import logging
from typing import List
import httpx
from app.core.config import settings
from app.models.schemas import LearningResource

logger = logging.getLogger("youtube_service")

# Simple in-memory cache to avoid duplicate API calls during a single session
_YOUTUBE_CACHE = {}

def fetch_youtube_resources_for_skill(skill_name: str, max_results: int = 3) -> List[LearningResource]:
    """
    Fetches real YouTube video tutorials for a given skill using Google YouTube Data API v3.
    """
    if not settings.YOUTUBE_API_KEY:
        logger.info("YOUTUBE_API_KEY is not configured.")
        return []

    cache_key = f"{skill_name.lower()}_{max_results}"
    if cache_key in _YOUTUBE_CACHE:
        return _YOUTUBE_CACHE[cache_key]

    api_url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": f"{skill_name} full course tutorial masterclass",
        "type": "video",
        "maxResults": max_results,
        "relevanceLanguage": "en",
        "key": settings.YOUTUBE_API_KEY,
    }

    try:
        with httpx.Client(timeout=5.0) as client:
            resp = client.get(api_url, params=params)
            if resp.status_code == 200:
                data = resp.json()
                items = data.get("items", [])
                resources = []
                
                for idx, item in enumerate(items):
                    video_id = item.get("id", {}).get("videoId")
                    if not video_id:
                        continue
                    
                    snippet = item.get("snippet", {})
                    raw_title = snippet.get("title", f"{skill_name} Video Guide")
                    title = html.unescape(raw_title)
                    channel_title = snippet.get("channelTitle", "YouTube Educator")
                    description = html.unescape(snippet.get("description", f"Watch in-depth YouTube video tutorial on {skill_name}."))
                    
                    thumbnails = snippet.get("thumbnails", {})
                    thumb_url = (
                        thumbnails.get("high", {}).get("url") or
                        thumbnails.get("medium", {}).get("url") or
                        thumbnails.get("default", {}).get("url") or
                        f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"
                    )

                    resource = LearningResource(
                        id=f"yt_{video_id}",
                        title=title,
                        type="YouTube Video Course",
                        url=f"https://www.youtube.com/watch?v={video_id}",
                        duration_hours=2.0,
                        difficulty="All Levels",
                        provider=f"YouTube ({channel_title})",
                        description=description if len(description) <= 180 else description[:177] + "...",
                        skill_name=skill_name,
                        thumbnail_url=thumb_url
                    )
                    resources.append(resource)
                
                _YOUTUBE_CACHE[cache_key] = resources
                return resources
            else:
                logger.warning(f"YouTube API error HTTP {resp.status_code}: {resp.text}")
    except Exception as e:
        logger.error(f"Failed to fetch YouTube resources for '{skill_name}': {e}")

    return []
