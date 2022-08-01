package catulvir.beerapp.backend;

public class Beer {
    private final long id;
	private final String content;

	public Beer(long id, String content) {
		this.id = id;
		this.content = content;
	}

	public long getId() {
		return id;
	}

	public String getContent() {
		return content;
	}
}
