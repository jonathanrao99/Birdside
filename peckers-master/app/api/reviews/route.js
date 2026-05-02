import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeIds = [
    "ChIJVVweuNo1dkgRi-IfLyhtgyU", // Hitchin Peckers
    "ChIJxVydIDgvdkgR3vKTXPIOuYo", // Stevenage Peckers
  ];

  if (!apiKey) {
    return NextResponse.json({ error: "API Key not found" }, { status: 500 });
  }

  try {
    const fetchReviews = async (placeId) => {
      // Places API (New) endpoint
      const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount,displayName&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      const reviews = data.reviews || [];
      const locationName = data.displayName?.text || "";

      return reviews.map((review) => ({
        ...review,
        locationName
      }));
    };

    const results = await Promise.all(placeIds.map(fetchReviews));

    // Combine reviews from all locations
    let allReviews = [];
    let totalRating = 0;
    let totalUserRatingCount = 0;

    results.forEach((resultReviews) => {
      allReviews = [...allReviews, ...resultReviews];
      // Note: we'd need another field to get total ratings across locations if needed, 
      // but for simplicity we'll just use the reviews we have.
    });

    // Map to the format expected by the frontend
    const mappedReviews = allReviews.map((review, index) => ({
      _id: `google-${index}-${review.name?.split('/').pop()}`,
      author_name: review.authorAttribution?.displayName || "Anonymous",
      text: review.text?.text || review.originalText?.text || "",
      relative_time_description: review.relativePublishTimeDescription,
      rating: review.rating,
      profile_photo_url: review.authorAttribution?.photoUri,
      locationName: review.locationName,
      time: new Date(review.publishTime).getTime() / 1000
    }));

    // Sort reviews by time (newest first)
    mappedReviews.sort((a, b) => b.time - a.time);

    return NextResponse.json({
      reviews: mappedReviews,
      averageRating: 0, // Simplified for now
      totalRatings: mappedReviews.length,
    });
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
