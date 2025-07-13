import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  city: string;
  district: string;
  rooms: string;
  view: string;
  type: string;
  pool: string;
  description: string;
  photos: string[];
  agent: string;
  status: "pending" | "approved" | "rejected" | "revision";
}

const RealEstatePlatform = () => {
  const [currentView, setCurrentView] = useState<
    "home" | "agent" | "manager" | "catalog"
  >("home");
  const [agentCode, setAgentCode] = useState("");
  const [managerCode, setManagerCode] = useState("");
  const [currentAgent, setCurrentAgent] = useState("");
  const [currentManager, setCurrentManager] = useState("");
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      title: "Современная вилла у моря",
      price: "2 500 000 €",
      location: "https://maps.google.com/villa-paphos",
      city: "Пафос",
      district: "Корал Бэй",
      rooms: "4",
      view: "море",
      type: "вилла",
      pool: "частный",
      description:
        "Роскошная вилла с панорамным видом на море. Современный дизайн, собственный бассейн и сад.",
      photos: [
        "https://v3.fal.media/files/monkey/LAEXwZz2QfrWntpsTDtRM_output.png",
      ],
      agent: "Анна Петрова",
      status: "pending",
    },
  ]);
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    title: "",
    price: "",
    location: "",
    city: "",
    district: "",
    rooms: "",
    view: "",
    type: "",
    pool: "",
    description: "",
    photos: [],
  });

  const handleAgentLogin = () => {
    if (agentCode.length >= 3) {
      setCurrentAgent(`Агент ${agentCode}`);
      setCurrentView("agent");
    }
  };

  const handleManagerLogin = () => {
    if (managerCode === "000") {
      setCurrentManager("Лера");
      setCurrentView("manager");
    } else if (managerCode === "111") {
      setCurrentManager("Илья");
      setCurrentView("manager");
    }
  };

  const addProperty = () => {
    if (newProperty.title && newProperty.price) {
      const property: Property = {
        id: Date.now().toString(),
        title: newProperty.title || "",
        price: newProperty.price || "",
        location: newProperty.location || "",
        city: newProperty.city || "",
        district: newProperty.district || "",
        rooms: newProperty.rooms || "",
        view: newProperty.view || "",
        type: newProperty.type || "",
        pool: newProperty.pool || "",
        description: newProperty.description || "",
        photos: newProperty.photos || [],
        agent: currentAgent,
        status: "pending",
      };
      setProperties([...properties, property]);
      setNewProperty({
        title: "",
        price: "",
        location: "",
        city: "",
        district: "",
        rooms: "",
        view: "",
        type: "",
        pool: "",
        description: "",
        photos: [],
      });
    }
  };

  const updatePropertyStatus = (id: string, status: Property["status"]) => {
    setProperties(properties.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  if (currentView === "home") {
    return (
      <div className="min-h-screen bg-light-gray">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-dark-gray mb-4 font-sans">
              RealEstate Platform
            </h1>
            <p className="text-xl text-medium-gray font-body">
              Профессиональная платформа для агентов недвижимости
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer animate-scale-in"
              onClick={() => setCurrentView("catalog")}
            >
              <CardHeader className="text-center">
                <Icon
                  name="Building"
                  size={48}
                  className="mx-auto mb-4 text-professional-blue"
                />
                <CardTitle className="text-xl font-sans">
                  Каталог объектов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-medium-gray font-body text-center">
                  Просмотр всех доступных объектов недвижимости
                </p>
                <Button className="w-full mt-4 bg-professional-blue hover:bg-blue-700">
                  Открыть каталог
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Icon
                  name="UserCheck"
                  size={48}
                  className="mx-auto mb-4 text-professional-blue"
                />
                <CardTitle className="text-xl font-sans">
                  Вход для агентов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="agent-code">Код доступа</Label>
                    <Input
                      id="agent-code"
                      type="password"
                      placeholder="Введите код"
                      value={agentCode}
                      onChange={(e) => setAgentCode(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleAgentLogin}
                    className="w-full bg-professional-blue hover:bg-blue-700"
                  >
                    Войти как агент
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Icon
                  name="Shield"
                  size={48}
                  className="mx-auto mb-4 text-professional-blue"
                />
                <CardTitle className="text-xl font-sans">
                  Вход для менеджеров
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="manager-code">Код доступа</Label>
                    <Input
                      id="manager-code"
                      type="password"
                      placeholder="000 или 111"
                      value={managerCode}
                      onChange={(e) => setManagerCode(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleManagerLogin}
                    className="w-full bg-professional-blue hover:bg-blue-700"
                  >
                    Войти как менеджер
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "agent") {
    return (
      <div className="min-h-screen bg-light-gray">
        <header className="bg-clean-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-gray font-sans">
              Личный кабинет агента
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-medium-gray font-body">
                Добро пожаловать, {currentAgent}
              </span>
              <Button variant="outline" onClick={() => setCurrentView("home")}>
                Выход
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="properties" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="properties">Мои объекты</TabsTrigger>
              <TabsTrigger value="add">Добавить объект</TabsTrigger>
              <TabsTrigger value="chat">Чат с менеджером</TabsTrigger>
            </TabsList>

            <TabsContent value="properties">
              <div className="grid gap-6">
                <h2 className="text-xl font-bold text-dark-gray font-sans">
                  Мои объекты (
                  {properties.filter((p) => p.agent === currentAgent).length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties
                    .filter((p) => p.agent === currentAgent)
                    .map((property) => (
                      <Card key={property.id} className="overflow-hidden">
                        <div className="aspect-video bg-gray-200 relative">
                          {property.photos[0] && (
                            <img
                              src={property.photos[0]}
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <Badge
                            className={`absolute top-2 right-2 ${
                              property.status === "approved"
                                ? "bg-success-green"
                                : property.status === "rejected"
                                  ? "bg-error-red"
                                  : property.status === "revision"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                            }`}
                          >
                            {property.status === "approved"
                              ? "Одобрено"
                              : property.status === "rejected"
                                ? "Отклонено"
                                : property.status === "revision"
                                  ? "На доработку"
                                  : "На проверке"}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2 font-sans">
                            {property.title}
                          </h3>
                          <p className="text-2xl font-bold text-professional-blue mb-2">
                            {property.price}
                          </p>
                          <div className="space-y-1 text-sm text-medium-gray">
                            <p>
                              <Icon
                                name="MapPin"
                                size={16}
                                className="inline mr-1"
                              />
                              {property.city}, {property.district}
                            </p>
                            <p>
                              <Icon
                                name="Home"
                                size={16}
                                className="inline mr-1"
                              />
                              {property.rooms} комн., {property.type}
                            </p>
                            <p>
                              <Icon
                                name="Eye"
                                size={16}
                                className="inline mr-1"
                              />
                              Вид на {property.view}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">
                    Добавить новый объект
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Название объекта</Label>
                      <Input
                        id="title"
                        value={newProperty.title}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            title: e.target.value,
                          })
                        }
                        placeholder="Например: Вилла у моря"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Цена</Label>
                      <Input
                        id="price"
                        value={newProperty.price}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            price: e.target.value,
                          })
                        }
                        placeholder="Например: 500 000 €"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Город</Label>
                      <Input
                        id="city"
                        value={newProperty.city}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            city: e.target.value,
                          })
                        }
                        placeholder="Например: Лимассол"
                      />
                    </div>
                    <div>
                      <Label htmlFor="district">Район</Label>
                      <Input
                        id="district"
                        value={newProperty.district}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            district: e.target.value,
                          })
                        }
                        placeholder="Например: Туристическая зона"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Количество комнат</Label>
                      <Select
                        value={newProperty.rooms}
                        onValueChange={(value) =>
                          setNewProperty({ ...newProperty, rooms: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 комната</SelectItem>
                          <SelectItem value="2">2 комнаты</SelectItem>
                          <SelectItem value="3">3 комнаты</SelectItem>
                          <SelectItem value="4">4 комнаты</SelectItem>
                          <SelectItem value="5+">5+ комнат</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Вид из окна</Label>
                      <Select
                        value={newProperty.view}
                        onValueChange={(value) =>
                          setNewProperty({ ...newProperty, view: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="море">Море</SelectItem>
                          <SelectItem value="сад">Сад</SelectItem>
                          <SelectItem value="город">Город</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Тип объекта</Label>
                      <Select
                        value={newProperty.type}
                        onValueChange={(value) =>
                          setNewProperty({ ...newProperty, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="вилла">Вилла</SelectItem>
                          <SelectItem value="апартаменты">
                            Апартаменты
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Бассейн</Label>
                      <Select
                        value={newProperty.pool}
                        onValueChange={(value) =>
                          setNewProperty({ ...newProperty, pool: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="частный">Частный</SelectItem>
                          <SelectItem value="общий">Общий</SelectItem>
                          <SelectItem value="нет">Нет бассейна</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Ссылка на Google Maps</Label>
                      <Input
                        id="location"
                        value={newProperty.location}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            location: e.target.value,
                          })
                        }
                        placeholder="https://maps.google.com/..."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={newProperty.description}
                      onChange={(e) =>
                        setNewProperty({
                          ...newProperty,
                          description: e.target.value,
                        })
                      }
                      placeholder="Подробное описание объекта..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Фотографии (до 15 штук)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Icon
                        name="Upload"
                        size={48}
                        className="mx-auto text-gray-400 mb-4"
                      />
                      <p className="text-medium-gray">
                        Перетащите фотографии сюда или нажмите для выбора
                      </p>
                      <Button variant="outline" className="mt-4">
                        Выбрать файлы
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={addProperty}
                    className="w-full bg-professional-blue hover:bg-blue-700"
                    size="lg"
                  >
                    Добавить объект
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-sans">
                    <Icon name="MessageSquare" size={24} />
                    Чат с менеджером
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 h-64 rounded-lg p-4 mb-4 overflow-y-auto">
                    <div className="space-y-3">
                      <div className="bg-clean-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-medium-gray">
                          Менеджер Лера
                        </p>
                        <p>Добро пожаловать! Как дела с новыми объектами?</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите сообщение..."
                      className="flex-1"
                    />
                    <Button className="bg-professional-blue hover:bg-blue-700">
                      <Icon name="Send" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (currentView === "manager") {
    return (
      <div className="min-h-screen bg-light-gray">
        <header className="bg-clean-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-gray font-sans">
              Панель менеджера
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-medium-gray font-body">
                Добро пожаловать, {currentManager}
              </span>
              <Button variant="outline" onClick={() => setCurrentView("home")}>
                Выход
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-dark-gray font-sans">
                Объекты на модерации
              </h2>
              <Badge variant="secondary">
                {properties.filter((p) => p.status === "pending").length} на
                проверке
              </Badge>
            </div>

            <div className="grid gap-6">
              {properties
                .filter((p) => p.status === "pending")
                .map((property) => (
                  <Card key={property.id}>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="md:col-span-1">
                          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                            {property.photos[0] && (
                              <img
                                src={property.photos[0]}
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <h3 className="text-xl font-bold text-dark-gray mb-2 font-sans">
                            {property.title}
                          </h3>
                          <p className="text-2xl font-bold text-professional-blue mb-4">
                            {property.price}
                          </p>
                          <div className="space-y-2 text-medium-gray">
                            <p>
                              <strong>Агент:</strong> {property.agent}
                            </p>
                            <p>
                              <strong>Город:</strong> {property.city},{" "}
                              {property.district}
                            </p>
                            <p>
                              <strong>Комнаты:</strong> {property.rooms} |{" "}
                              <strong>Тип:</strong> {property.type}
                            </p>
                            <p>
                              <strong>Вид:</strong> {property.view} |{" "}
                              <strong>Бассейн:</strong> {property.pool}
                            </p>
                            <p>
                              <strong>Описание:</strong> {property.description}
                            </p>
                            {property.location && (
                              <p>
                                <strong>Локация:</strong>{" "}
                                <a
                                  href={property.location}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-professional-blue hover:underline"
                                >
                                  Открыть на карте
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-1">
                          <div className="space-y-3">
                            <Button
                              onClick={() =>
                                updatePropertyStatus(property.id, "approved")
                              }
                              className="w-full bg-success-green hover:bg-green-700"
                            >
                              <Icon name="Check" size={16} className="mr-2" />
                              Принять
                            </Button>
                            <Button
                              onClick={() =>
                                updatePropertyStatus(property.id, "rejected")
                              }
                              className="w-full bg-error-red hover:bg-red-700"
                            >
                              <Icon name="X" size={16} className="mr-2" />
                              Отклонить
                            </Button>
                            <Button
                              onClick={() =>
                                updatePropertyStatus(property.id, "revision")
                              }
                              variant="outline"
                              className="w-full"
                            >
                              <Icon name="Edit" size={16} className="mr-2" />
                              На доработку
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "catalog") {
    return (
      <div className="min-h-screen bg-light-gray">
        <header className="bg-clean-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-gray font-sans">
              Каталог недвижимости
            </h1>
            <Button variant="outline" onClick={() => setCurrentView("home")}>
              На главную
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="limassol">Лимассол</SelectItem>
                  <SelectItem value="paphos">Пафос</SelectItem>
                  <SelectItem value="nicosia">Никосия</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Комнаты" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 комната</SelectItem>
                  <SelectItem value="2">2 комнаты</SelectItem>
                  <SelectItem value="3">3 комнаты</SelectItem>
                  <SelectItem value="4+">4+ комнат</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa">Вилла</SelectItem>
                  <SelectItem value="apartment">Апартаменты</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-professional-blue hover:bg-blue-700">
                <Icon name="Search" size={16} className="mr-2" />
                Поиск
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties
              .filter((p) => p.status === "approved")
              .map((property) => (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-gray-200 relative">
                    {property.photos[0] && (
                      <img
                        src={property.photos[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <Badge className="absolute top-2 left-2 bg-professional-blue">
                      {property.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 font-sans">
                      {property.title}
                    </h3>
                    <p className="text-2xl font-bold text-professional-blue mb-3">
                      {property.price}
                    </p>
                    <div className="space-y-1 text-sm text-medium-gray mb-4">
                      <p>
                        <Icon name="MapPin" size={16} className="inline mr-1" />
                        {property.city}, {property.district}
                      </p>
                      <p>
                        <Icon name="Home" size={16} className="inline mr-1" />
                        {property.rooms} комн.
                      </p>
                      <p>
                        <Icon name="Eye" size={16} className="inline mr-1" />
                        Вид на {property.view}
                      </p>
                      <p>
                        <Icon name="Waves" size={16} className="inline mr-1" />
                        Бассейн: {property.pool}
                      </p>
                    </div>
                    <p className="text-sm text-medium-gray mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-professional-blue hover:bg-blue-700"
                        size="sm"
                      >
                        Подробнее
                      </Button>
                      {property.location && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={property.location}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon name="MapPin" size={16} />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RealEstatePlatform;
